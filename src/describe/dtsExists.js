import { statSync } from "fs"
import { fileURLToPath, resolve } from "url"

export const dtsExists = (url, name) => {
  const path = fileURLToPath(resolve(url, `${name}.d.ts`))
  const dtsFile = statSync(path)
  return dtsFile && dtsFile.isFile && dtsFile.isFile()
}
