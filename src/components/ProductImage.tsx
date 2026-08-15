"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

function isLocalPreview(src: string) {
  return src.startsWith("blob:") || src.startsWith("data:");
}

export function ProductImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  sizes,
  priority,
}: Props) {
  if (!src || isLocalPreview(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src || undefined}
        alt={alt}
        className={fill ? `absolute inset-0 h-full w-full ${className ?? ""}` : className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
