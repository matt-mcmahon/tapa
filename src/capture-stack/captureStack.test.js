import { fileURLToPath } from "url"
import { describe } from "riteway"

import {
  parseLine,
  keep,
  truncate,
  capture,
  captureStack as namedExport,
  default as captureStack,
} from "./captureStack.js"
import { captureStack as indexExport } from "./captureStack"

describe("capture-stack exports", async assert => {
  assert({
    given: 'a module named "./captureStack.js"',
    should: "have a default export",
    actual: typeof captureStack,
    expected: "function",
  })

  assert({
    given:
      'import { captureStack as namedExport } from "./captureStack.js"',
    should: "be identical to default export",
    actual: namedExport,
    expected: captureStack,
  })

  assert({
    should: "be identical to default export",
    actual: indexExport,
    expected: captureStack,
  })
})

const line = `  at captureStack (w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.js:11:9)`
const parsedLine = {
  line,
  column: 11,
  filename: "captureStack.js",
  method: "captureStack",
  path:
    "w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.js:11:9",
  row: 9,
}

describe("capture-stack/split-line", async assert => {
  {
    const given = `the line ${line}`
    const should = "parse"
    const expected = parsedLine
    const actual = parseLine(line)
    assert({
      given,
      should,
      expected,
      actual,
    })
  }
})

describe("capture-stack/keep", async assert => {
  assert({
    given: `parsedLine.path = "${
      parsedLine.path
    }" and filter ["not-found"]`,
    should: "return true",
    expected: true,
    actual: keep(["not-found"])(line),
  })

  assert({
    given: `parsedLine.path = "${
      parsedLine.path
    }" and filter ["capture-stack"]`,
    should: "return false",
    expected: false,
    actual: keep(["capture-stack"])(line),
  })

  assert({
    given: `parsedLine.path = "${
      parsedLine.path
    }" and filter ["not-found", "capture-stack"]`,
    should: "return false",
    expected: false,
    actual: keep(["not-found", "capture-stack"])(line),
  })
})

describe("capture-stack", async assert => {
  const capturedStack = `
Error
  at captureStack (w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.js:11:9)
  at _9c4‍.r.describe (w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.test.js:41:17)
  at describe (w:\\@mwm\\tapa\\src\\describe\\describe.js:62:9)
  at Object.<anonymous> (w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.test.js:17:1)
  at Generator.next (<anonymous>)
  at bl (W:\\@mwm\\tapa\\node_modules\\.registry.npmjs.org\\esm\\3.2.25\\node_modules\\esm\\esm.js:1:245412)
  at kl (W:\\@mwm\\tapa\\node_modules\\.registry.npmjs.org\\esm\\3.2.25\\node_modules\\esm\\esm.js:1:247659)
  at Object.u (W:\\@mwm\\tapa\\node_modules\\.registry.npmjs.org\\esm\\3.2.25\\node_modules\\esm\\esm.js:1:287740)
  at Object.o (W:\\@mwm\\tapa\\node_modules\\.registry.npmjs.org\\esm\\3.2.25\\node_modules\\esm\\esm.js:1:287137)
  at Object.<anonymous> (W:\\@mwm\\tapa\\node_modules\\.registry.npmjs.org\\esm\\3.2.25\\node_modules\\esm\\esm.js:1:284879)
  at W:\\@mwm\\tapa\\node_modules\\.registry.npmjs.org\\esm\\3.2.25\\node_modules\\esm\\esm.js:1:284879
    `.trim()

  const filteredStack = `
Error
  at captureStack (w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.js:11:9)
  at _9c4‍.r.describe (w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.test.js:41:17)
  at describe (w:\\@mwm\\tapa\\src\\describe\\describe.js:62:9)
  at Object.<anonymous> (w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.test.js:17:1)
  at Generator.next (<anonymous>)
    `.trim()

  const stack = captureStack()

  assert({
    given: `captureStack()`,
    should: `return a string`,
    actual: typeof stack,
    expected: "string",
  })

  {
    const expected = true
    const actual = stack.length > 0
    const given = "a stack"
    const should = `have a stack.length > 0`
    assert({ given, should, actual, expected })
  }

  {
    const file = fileURLToPath(import.meta.url)
    const actual = stack.includes(file)
    const expected = true
    const given = "real stack trace"
    const should = `include path for this file`
    assert({ given, should, actual, expected })
  }
})
