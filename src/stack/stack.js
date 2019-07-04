import { parse, relative } from "path"
import { pipe, map, join } from "@mwm/functional"

Error.prepareStackTrace = (error, structuredStackTrace) => {
  return error[Symbol.for("TapaError")]
    ? tapaStack(structuredStackTrace)
    : nodeStack(structuredStackTrace)
}

const is = o => (method, key) => {
  const value =
    typeof o[method] === "function" ? o[method]() : o.method
  return !value ? {} : { [key || method]: value }
}

export const captureStack = caller => {
  const err = { [Symbol.for("TapaError")]: true }
  Error.captureStackTrace(err, caller)
  return err.stack
}

const extractStackData = c => {
  const f = is(c)
  const g = {
    ...f("getScriptNameOrSourceURL", "source"),
    ...f("getColumnNumber", "column"),
    ...f("getFunctionName", "function"),
    ...f("getLineNumber", "row"),
    ...f("getMethodName", "method"),
    ...f("getTypeName", "type"),
    ...f("toString", "value"),
    ...f("getEvalOrigin", "evalOrigin"),
    ...f("getFunction", "function"),
    ...f("getFileName", "fileName"),
    ...f("getPosition", "position"),
    ...f("getPromiseIndex", "promiseIndex"),
    ...f("getThis", "this"),
    ...f("isAsync"),
    ...f("isConstructor"),
    ...f("isEval"),
    ...f("isNative"),
    ...f("isPromiseAll"),
    ...f("isTopLevel"),
  }
  return g
}

const parsePath = ({ source, ...c }) => {
  const r = parse(relative(process.cwd(), source))

  if (source.startsWith("internal")) {
    c.isInternal = true
  } else if (source.includes("node_modules")) {
    c.isModule = true
  } else {
    c.isUser = true
  }

  c.file = {
    name: r.base,
    absolute: source,
    relative: r.dir,
  }
  return c
}

const parseString = c => {
  return Object.defineProperty(c, "toString", {
    value: function toString() {
      return c.value
    },
  })
}

const tapaStack = pipe(
  map(extractStackData),
  map(parsePath),
  map(parseString)
)

const nodeStack = pipe(
  map(c => c.toString()),
  join("\n")
)
