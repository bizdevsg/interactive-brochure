import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  src: string;
  alt: string;
  /** Mengisi penuh parent yang berposisi relative. */
  fill?: boolean;
  /** Gambar penting di layar pertama: dimuat segera dengan prioritas tinggi. */
  priority?: boolean;
};

/** Pengganti next/image: <img> biasa dengan lazy loading. */
export function Image({ fill, priority, sizes, className, alt, ...rest }: Props) {
  const classes = [fill && "absolute inset-0 h-full w-full", className].filter(Boolean).join(" ");
  return (
    <img
      {...rest}
      alt={alt}
      sizes={rest.srcSet ? sizes : undefined}
      className={classes}
      loading={priority ? "eager" : (rest.loading ?? "lazy")}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
