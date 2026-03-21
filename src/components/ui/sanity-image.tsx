import Image, { type ImageProps } from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type SanityImageProps = Omit<ImageProps, "src"> & {
  image: SanityImageSource;
  alt: string;
  width?: number;
  height?: number;
};

export function SanityImage({
  image,
  alt,
  width = 1200,
  height = 800,
  className,
  ...props
}: SanityImageProps) {
  const src = urlFor(image).width(width).height(height).auto("format").url();

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
}
