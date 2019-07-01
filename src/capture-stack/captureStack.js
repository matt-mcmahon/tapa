import { normalize, parse } from "path"
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

const neverNaN = pipe(
  s => parseInt(s, 10),
  n => (isNaN(n) ? undefined : n)
)

const parseBase = (base = "::") => {
  const [filename, row, column] = base.split(":")
  return {
    filename,
    column: neverNaN(column),
    row: neverNaN(row),
  }
}

const parsePath = (path = "") => {
  const { base, dir } = parse(path)
  return {
    dir,
    ...parseBase(base),
  }
}

const parseLine = iife(
  methodRe => line => {
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
  getMethodRe()
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
