// LISTA OFICIAL DE DDDS VÁLIDOS NO BRASIL
export const VALID_DDDS = [
  11, 12, 13, 14, 15, 16, 17, 18, 19, // SP
  21, 22, 24, // RJ
  27, 28, // ES
  31, 32, 33, 34, 35, 37, 38, // MG
  41, 42, 43, 44, 45, 46, // PR
  47, 48, 49, // SC
  51, 53, 54, 55, // RS
  61, // DF
  62, 64, // GO
  63, // TO
  65, 66, // MT
  67, // MS
  68, // AC
  69, // RO
  71, 73, 74, 75, 77, // BA
  79, // SE
  81, 87, // PE
  82, // AL
  83, // PB
  84, // RN
  85, 88, // CE
  86, 89, // PI
  91, 93, 94, // PA
  92, 97, // AM
  95, // RR
  96, // AP
  98, 99 // MA
];

// VALIDAÇÃO DE CPF (Algoritmo Oficial)
export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) 
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) 
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

// VALIDAÇÃO DE CNPJ (Algoritmo Oficial)
export const validateCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj.length !== 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (/^(\d)\1+$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(1))) return false;

  return true;
};

// VALIDAÇÃO DE TELEFONE E DDD
export const validatePhone = (phone: string): { isValid: boolean, message?: string } => {
  const cleanPhone = phone.replace(/\D/g, '');

  // Verifica tamanho (11 dígitos = DDD + 9 dígitos)
  if (cleanPhone.length !== 11) {
    return { isValid: false, message: 'O telefone deve conter DDD + 9 dígitos (ex: 11999998888).' };
  }

  // Verifica se começa com 9 (celular)
  if (cleanPhone.substring(2, 3) !== '9') {
     return { isValid: false, message: 'O número deve ser um celular e começar com 9.' };
  }

  // Verifica DDD
  const ddd = parseInt(cleanPhone.substring(0, 2));
  if (!VALID_DDDS.includes(ddd)) {
    return { isValid: false, message: `O DDD ${ddd} não é um DDD válido no Brasil.` };
  }

  return { isValid: true };
};

// VALIDAÇÃO DE E-MAIL (Domínios e TLDs permitidos)
export const validateEmail = (email: string): { isValid: boolean, message?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { isValid: false, message: 'Formato de e-mail inválido.' };

  const domain = email.split('@')[1];
  const tld = domain.substring(domain.lastIndexOf('.') + 1); // ex: com, br, net

  // Lista de provedores comuns permitidos (exemplo)
  const commonProviders = ['gmail', 'hotmail', 'outlook', 'yahoo', 'icloud', 'uol', 'bol', 'terra', 'ig', 'live'];
  
  // Extrai nome do provedor (ex: gmail de gmail.com)
  const providerName = domain.split('.')[0];
  
  // Categorias de domínios brasileiros (Registro.br) e genéricos comuns
  const validExtensions = [
    'com', 'net', 'org', 'br', // Genéricos
    'adv.br', 'arq.br', 'cnt.br', 'eng.br', 'eti.br', 'med.br', 'odo.br', // Profissionais
    'agr.br', 'art.br', 'esp.br', 'etc.br', 'far.br', 'imb.br', 'ind.br', 'inf.br', 'jor.br', 'jus.br', 'log.br', 'psi.br', 'radio.br', 'rec.br', 'srv.br', 'tmp.br', 'tur.br', 'tv.br', // Pessoas Jurídicas
    'adm.br', 'bio.br', 'bmd.br', 'cim.br', 'cng.br', 'ecn.br', 'fnd.br', 'fot.br', 'fst.br', 'ggf.br', 'mat.br', 'mus.br', 'not.br', 'ntr.br', 'ppg.br', 'pro.br', 'psc.br', 'qsl.br', 'slg.br', 'taxi.br', 'teo.br', 'trd.br', 'vet.br', 'zlg.br', // Outros profissionais
    'blog.br', 'flog.br', 'nom.br', 'vlog.br', 'wiki.br', // Pessoas Físicas
    'gov.br', 'edu.br', 'mil.br' // Institucionais
  ];

  // Verifica se o domínio termina com uma extensão válida ou se é um provedor comum conhecido
  // A lógica aqui é: Se for um provedor comum, aceitamos. Se for corporativo, validamos a terminação.
  
  const isCommonProvider = commonProviders.includes(providerName);
  
  // Verifica se termina com alguma extensão válida (ex: .com.br contém 'br', .com contém 'com')
  const isValidExtension = validExtensions.some(ext => domain.endsWith('.' + ext) || domain === ext);

  if (!isValidExtension && !isCommonProvider) {
      return { isValid: false, message: 'Por favor, utilize um e-mail com domínio válido (ex: .com, .com.br, .adv.br).' };
  }

  return { isValid: true };
};

// FORMATADORES
export const formatCPF = (v: string) => v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
export const formatCNPJ = (v: string) => v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
export const formatPhone = (v: string) => {
    v = v.replace(/\D/g, '');
    if (v.length === 11) return v.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    return v;
};
