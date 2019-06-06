import { pipe, not } from "@mwm/functional"

/*
  at captureStack (w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.js:11:9)
*/

const methodRe = () => {
  const openParen = `\\(*`
  const closeParen = `\\)*`
  const notParen = `[^${openParen}${closeParen}]`
  const startLine = `^\\s+`
  const at = `at\\s*`
  const fun = `(${notParen}+)\\s+`
  const path = `(${notParen}+)`
  const endLine = "\\s*$"
  const pattern =
    startLine +
    at +
    fun +
    openParen +
    path +
    closeParen +
    endLine
  return new RegExp(pattern, "i")
}

/* example line and paths
w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.js:11:9
/@mwm/tapa/src/capture-stack/captureStack.js:11:9
*/
const pathRe = () => {
  const slash = `[\\\\/]`
  const notSlash = `[^\\\\/]`
  const folder = `${notSlash}+${slash}+`
  const windows = `(?:\\w+:${slash}+)`
  const posix = `(?:${slash}+)`

  const startLine = `^\\s*`
  const drive = `(?:${windows}|${posix})`
  const folders = `(?:${folder})+`
  const filename = `([^:]+):*`
  const column = `(?:(\\d+)):*`
  const row = `(\\d+)`
  const endLine = `\\s*$`
  const pattern =
    startLine +
    drive +
    folders +
    filename +
    column +
    row +
    endLine
  return new RegExp(pattern, "i")
}

const parseLine = line => {
  const p = pathRe()
  const [, method, path] = line.match(methodRe())
  const [, filename, column, row] = path.match(p)

  return {
    method,
    path,
    filename,
    row,
    column,
  }
}

const keep = terms => line =>
  terms.reduce(
    (keep, term) => keep && not(line.includes(term)),
    true
  )

const capture = above => {
  const e = {}
  Error.captureStackTrace(e, above)
  return e.stack.split("\n")
}

const truncate = line => line.replace(process.cwd(), "")

const captureStack = (
  above,
  {
    filter = [
      "node_modules",
      "at Generator.next (<anonymous>)",
    ],
  } = {}
) => capture(above).map(parseLine)
// .map(keep(filter))
// .map(truncate)

export {
  parseLine,
  keep,
  truncate,
  capture,
  captureStack,
  captureStack as default,
}
