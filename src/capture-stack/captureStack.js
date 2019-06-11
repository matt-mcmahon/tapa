import { normalize } from "path"
import {
  head,
  map,
  not,
  pipe,
  prop,
  split,
  tail,
  blackbird,
  filter,
  trim,
  iife,
} from "@mwm/functional"

const getMethodRe = () => {
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

const getPathRe = () => {
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

const parseLine = iife(
  (methodRe, pathRe) => line => {
    const parsePath = (path = "") => {
      const [, filename, column, row] = path.match(
        pathRe
      ) || [, "", NaN, NaN]

      return {
        path: normalize(path),
        filename,
        column: parseInt(column, 10),
        row: parseInt(row, 10),
      }
    }

    const [, method, path] =
      (line && line.match(methodRe)) || []

    return {
      line,
      method,
      ...parsePath(path),
    }
  },
  getMethodRe(),
  getPathRe()
)

const keep = line => {
  const excludeFolders = ["node_modules"]
  return excludeFolders.reduce(
    (keep, folder) => keep && not(line.includes(folder)),
    true
  )
}

const truncate = line => line.replace(process.cwd(), "")

const pause = message => value => {
  message
  return value
}

const getHead = pipe(
  head,
  prop("line"),
  trim
)

const getTail = pipe(
  tail,
  pause("getTail -> keep"),
  filter(keep),
  map(truncate),
  map(parseLine)
)

const converge = (message, lines) =>
  Object.freeze(
    Object.defineProperties(
      {
        message,
        lines: Object.freeze(lines),
      },
      {
        length: {
          get: () => lines.length,
        },
        includes: {
          value: path =>
            lines.find(line => line.path.includes(path)),
        },
      }
    )
  )

const parseError = pipe(
  prop("stack"),
  split("\n"),
  blackbird(converge)(getHead, getTail)
)

const captureStack = pipe(
  above => {
    const e = {}
    Error.captureStackTrace(e, above)
    return e
  },
  parseError
)

export {
  parseLine,
  keep,
  truncate,
  parseError,
  captureStack,
}
