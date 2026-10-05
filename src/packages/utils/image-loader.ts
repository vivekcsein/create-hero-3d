/**
 * next/image loader for static export (see next.config.ts).
 * There is no optimizer on static hosting, so this only prefixes the
 * basePath onto local images and leaves remote URLs alone.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src }: { src: string }): string {
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
  return `${BASE_PATH}${src}`;
}
