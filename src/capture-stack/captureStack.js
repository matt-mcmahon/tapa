import { normalize } from "path"
import {
  pipe,
  not,
  split,
  map,
  tail,
  head,
  ifElse,
  defaultTo,
  prop,
  identity,
} from "@mwm/functional"

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

const parsePath = (path = "") => {
  const [, filename, column, row] = path.match(
    pathRe()
  ) || [, "", NaN, NaN]

  return {
    path: normalize(path),
    filename,
    column: parseInt(column, 10),
    row: parseInt(row, 10),
  }
}

const parseLine = line => {
  const [, method, path] =
    (line && line.match(methodRe())) || []

  return {
    line,
    method,
    ...parsePath(path),
  }
}

const keep = (excludeFolders = []) => ({ path = "" }) =>
  excludeFolders.reduce(
    (keep, folder) => keep && not(path.includes(folder)),
    true
  )

const truncate = line => line.replace(process.cwd(), "")

const pause = message => value => {
  message
  return value
}

const toStack = stack => {
  const message = head(stack).line.trim()
  const lines = tail(stack)
  const includes = path =>
    lines.find(line => line.path.includes(path)) !==
    undefined

  return Object.defineProperties(
    {
      message,
      lines: lines,
    },
    {
      length: {
        get: () => lines.length,
      },
      includes: {
        value: includes,
      },
    }
  )
}

/**
 * Given a `flag` and an `action`, __iff__ will apply the action _if and only
 * if_ the flag is true.
 *
 * @param {boolean} flag apply action if true
 * @param {function} action function to apply
 */
const iff = flag => action =>
  ifElse(() => !!flag)(action)(identity)

const parseStack = ({
  excludePaths = ["node_modules"],
  truncatePaths = true,
  maxWidth = 80,
}) =>
  pipe(
    split("\n"),
    map(parseLine),
    map(keep(excludePaths)),
    iff(truncatePaths)(map(truncate)),
    toStack
  )

const parseError = ({ excludePaths }) =>
  pipe(
    prop("stack"),
    parseStack(excludePaths)
  )

const captureStack = ({ excludePaths }) =>
  pipe(
    above => {
      const e = {}
      Error.captureStackTrace(e, above)
      return e.stack
    },
    parseStack(excludePaths)
  )

export {
  parseLine,
  keep,
  truncate,
  parseError,
  captureStack,
  captureStack as default,
}
