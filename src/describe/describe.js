import { assert } from "../assert"
import { state } from "../state"
import { inspect } from "../inspect"

export const describe = async (description, plan) => {
  const assertions = []

  const Assert = block => {
    assert(block).then(assertion =>
      assertions.push(assertion)
    )
  }

  const s = plan(Assert)
    .then(() => assertions)
    .then(bindState(description))

  s.then(printResults(description))
    .then(console.log)
    .catch(printError(description))
    .then(console.log)

  return s
}

const bindState = description => assertions => {
  return state(description, ...assertions).next()
}

const printResults = description => state => {
  return inspect`


================================================================================

Test Description:
  ${description}

Test Summary:
  ${state.summary}

--------------------------------------------------------------------------------

`
}

const printError = description => err => {
  const { message, stack } = err
  const trace = (v, i, a) => {
    return i < a.length - 1
      ? `
       ├ ${v}`
      : `
       └ ${v}`
  }
  return `


================================================================================

Unexpected Error in ${description}

Error: ┌ ${message}
       │ ${stack
         .split("\n")
         .map(trace)
         .join("")}

--------------------------------------------------------------------------------

`
}
