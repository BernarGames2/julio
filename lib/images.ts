import "server-only";
import fs from "node:fs";
import path from "node:path";

/** Verifica no build se a foto real existe em /public. */
export function imageExists(src: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}
