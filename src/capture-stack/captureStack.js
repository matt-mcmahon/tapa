import { pipe, not, split, map } from "@mwm/functional"

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
  const [, method, path] =
    (line && line.match(methodRe())) || []
  const [, filename, column, row] =
    (path && path.match(p)) || []

  return {
    line,
    method,
    path,
    filename,
    row: parseInt(row, 10),
    column: parseInt(column, 10),
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
  return e.stack
}

const truncate = line => line.replace(process.cwd(), "")

const pause = message => value => {
  message
  return value
}

const parseError = error => parseStack(error.stack)

const parseStack = pipe(
  split("\n"),
  // pause("parseStack"),
  map(parseLine)
  // pause("parseStack")
  // map(keep(filter)),
  // pause("parseStack")
  // map(truncate)
)

const captureStack = pipe(
  capture,
  pause("captureStack"),
  parseStack,
  pause("captureStack")
)

export {
  parseLine,
  keep,
  truncate,
  capture,
  parseError,
  captureStack,
  captureStack as default,
}
