import React from 'react';
import { cn } from '@/lib/utils';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  unoptimized?: boolean;
  priority?: boolean;
}

const Image: React.FC<ImageProps> = ({
  fill,
  unoptimized,
  className,
  style,
  alt = '',
  src,
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(fill ? 'absolute inset-0 w-full h-full object-cover' : '', className)}
      style={{
        ...(fill ? { position: 'absolute', height: '100%', width: '100%', inset: 0 } : {}),
        ...style,
      }}
      loading="lazy"
      {...props}
    />
  );
};

export default Image;
