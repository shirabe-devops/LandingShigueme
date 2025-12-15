<?php
/**
 * N8N Proxy Script - Shigueme Consultoria
 * 
 * Instruções de Instalação na Hostinger/cPanel:
 * 1. No gerenciador de arquivos, crie uma pasta chamada 'api' dentro de 'public_html'.
 * 2. Crie um arquivo chamado 'n8n-proxy.php' dentro dessa pasta.
 * 3. Cole este código dentro do arquivo.
 * 4. SUBSTITUA a variável $n8nWebhookUrl abaixo pela URL do seu Webhook de Produção do N8N.
 */

// =======================================================================
// CONFIGURAÇÃO
// =======================================================================

// [IMPORTANTE] COLOQUE AQUI A URL DO SEU WEBHOOK DO N8N (Production URL)
$n8nWebhookUrl = 'https://n8n.shirabe.com.br/webhook-test/lpshigueme';

// =======================================================================
// LÓGICA DO PROXY
// =======================================================================

// 1. Configurar CORS (Permitir que o React acesse este script)
// Permite acesso de qualquer origem (*). Para mais segurança, troque '*' pelo seu domínio (ex: 'https://shirabe.com.br')
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// 2. Tratar requisições OPTIONS (Preflight do navegador)
// O navegador envia isso antes do POST para verificar se é seguro enviar os dados.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 3. Bloquear métodos que não sejam POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Method not allowed. Use POST.']);
    exit();
}

// 4. Receber o JSON enviado pelo React
$inputJSON = file_get_contents('php://input');
$inputData = json_decode($inputJSON, true);

// 5. Validar se o JSON é válido
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Invalid JSON input']);
    exit();
}

// 6. Preparar a requisição cURL para o N8N
$ch = curl_init($n8nWebhookUrl);

// 7. Configurar opções do cURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Retornar a resposta como string
curl_setopt($ch, CURLOPT_POST, true);           // Método POST
curl_setopt($ch, CURLOPT_POSTFIELDS, $inputJSON); // Enviar o mesmo JSON recebido
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($inputJSON),
    'User-Agent: Shigueme-Proxy/1.0'
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 30); // Timeout de 30 segundos

// 8. Executar a requisição
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);

curl_close($ch);

// 9. Verificar erros de conexão (cURL level)
if ($curlError) {
    http_response_code(502); // Bad Gateway
    echo json_encode([
        'error' => 'Failed to connect to N8N',
        'details' => $curlError
    ]);
    exit();
}

// 10. Retornar a resposta do N8N para o React
http_response_code($httpCode);

// Se o N8N retornou algo, repassa. Se não, envia sucesso genérico.
if ($response) {
    // Tenta decodificar para garantir que estamos retornando JSON válido
    $jsonResponse = json_decode($response);
    if ($jsonResponse) {
        echo $response;
    } else {
        // Se o N8N retornou texto puro, empacota em JSON
        echo json_encode(['n8n_response' => $response]);
    }
} else {
    echo json_encode(['status' => 'success', 'message' => 'Webhook received']);
}
?>