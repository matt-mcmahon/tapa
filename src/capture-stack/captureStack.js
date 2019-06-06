import { pipe, not } from "@mwm/functional"

const includes = (filter = ["node_modules"]) => line =>
  Array.isArray(filter) &&
  filter.reduce((include, term) => {
    return include && line.includes(term)
  }, true)

const captureStack = above => {
  const e = {}
  Error.captureStackTrace(e, above)
  return e.stack
}

export { includes, captureStack, captureStack as default }
