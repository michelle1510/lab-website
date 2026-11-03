export const BASE_PATH = "/lab-website";

export function imagePath(path: string) {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}