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
  defaultTo,
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
  const drive = `(${windows}|${posix})`
  const folders = `((?:${folder})+)`
  const filename = `([^:]+):*`
  const column = `(?:(\\d+)):*`
  const row = `(\\d+)`
  const endLine = `\\s*$`
  const pattern =
    startLine +
    drive +
    folders +
    filename +
    row +
    column +
    endLine
  return new RegExp(pattern, "i")
}

const parseLine = iife(
  (methodRe, pathRe) => line => {
    const parsePath = (location = "") => {
      const matches = defaultTo([])(location.match(pathRe))
      const [, drive, path, filename, row, column] = matches
      return {
        path: defaultTo("")(drive + path),
        filename: defaultTo(location)(filename),
        column: defaultTo(undefined)(parseInt(column, 10)),
        row: defaultTo(undefined)(parseInt(row, 10)),
      }
    }

    const parseMethod = line => {
      const matches = defaultTo([])(line.match(methodRe))
      const [, method, location] = matches
      return { method, location }
    }

    const { method, location } = parseMethod(line)

    return Object.defineProperty(
      { line, method, ...parsePath(location) },
      "toString",
      {
        enumerable: false,
        value: () =>
          `${method}\n${path}${filename}${
            row ? row + ":" : ""
          }${column ? column + ":" : ""}`,
      }
    )
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
  filter(keep),
  map(truncate),
  map(parseLine),
  pause("getTail -> parseLine")
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
