export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/lab-website" : "";

export function imagePath(path: string) {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
