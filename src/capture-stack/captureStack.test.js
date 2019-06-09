import { fileURLToPath } from "url"
import { describe } from "riteway"

import {
  parseLine,
  keep,
  captureStack as namedExport,
  default as captureStack,
  parseError,
} from "./captureStack.js"
import { captureStack as indexExport } from "./captureStack"

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

describe("capture-stack/split-line", async assert => {
  {
    const given = `the line "${line}"`
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
  {
    const given = `parsedLine.path = "${
      parsedLine.path
    }" and filter ["not-found"]`
    const should = "return true"
    const actual = keep(["not-found"])(line)
    const expected = true
    assert({ given, should, expected, actual })
  }

  {
    const given = `parsedLine.path = "${
      parsedLine.path
    }" and filter ["capture-stack"]`
    const should = "return false"
    const actual = keep(["capture-stack"])(line)
    const expected = false
    assert({ given, should, expected, actual })
  }

  {
    const given = `parsedLine.path = "${
      parsedLine.path
    }" and filter ["not-found", "capture-stack"]`
    const should = "return false"
    const expected = false
    const actual = keep(["not-found", "capture-stack"])(
      line
    )
    assert({ given, should, expected, actual })
  }
})

describe("capture-stack", async assert => {
  const stack = captureStack()

  {
    const given = `captureStack()`
    const should = `have the properties { message, lines }`
    const actual = Object.keys(stack).sort()
    const expected = ["lines", "message"].sort()
    assert({ given, should, actual, expected })
  }

  {
    const expected = true
    const actual = stack.length > 0
    const given = "a stack"
    const should = `have a stack.length > 0`
    assert({ given, should, actual, expected })
  }
})

describe("capture-stack/parseError", async assert => {
  const exampleError = {
    name: "Error",
    stack: `
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
    `.trim(),
  }

  const filepath =
    "w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.js"

  const stack = parseError(exampleError)

  {
    const actual = stack.includes(filepath)
    const expected = true
    const given = "parseError(...)"
    const should = `include filepath "${filepath}"`
    assert({ given, should, actual, expected })
  }
})
