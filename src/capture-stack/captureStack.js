import { pipe, not } from "@mwm/functional"

const includes = (filter = ["node_modules"]) => line =>
  Array.isArray(filter) &&
  filter.reduce((include, term) => {
    return include && line.includes(term)
  }, true)

const captureStack = ({ above, filter } = {}) => {
  const e = {}
  Error.captureStackTrace(e, above)
  return e.stack
    .split("\n")
    .filter(
      pipe(
        includes(filter),
        not
      )
    )
    .join("\n")
}

export { includes, captureStack, captureStack as default }
