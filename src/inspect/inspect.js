import { inspect as nodeInspect } from "util"

const defaultOptions = {
  depth: Infinity,
  colors: true,
  breakLength: Infinity,
}

const configure = (options = defaultOptions) => (
  strings,
  ...values
) => {
  const inspectedValues = values.map(value =>
    nodeInspect(value, options)
  )
  const full = []
  for (let i = 0; i < strings.length; i++) {
    if (strings[i]) {
      full.push(strings[i])
    }
    if (inspectedValues[i]) {
      full.push(inspectedValues[i])
    }
  }
  return full.join("")
}

const inspect = configure()

export { inspect, configure }
