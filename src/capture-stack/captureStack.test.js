import { fileURLToPath } from "url"
import { describe } from "riteway"

import {
  parseLine,
  keep,
  captureStack,
  parseError,
} from "./captureStack.js"
import { captureStack as indexExport } from "."
import { inspect } from "../index.js"

const exampleLine = `  at captureStack (w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.js:11:9)`

const parsedLine = {
  method: "captureStack",
  column: 9,
  row: 11,
  dir: "w:\\@mwm\\tapa\\src\\capture-stack",
  filename: "captureStack.js",
  line: exampleLine,
}

describe("capture-stack exports", async assert => {
  {
    const given = 'a module named "./captureStack.js"'
    const should = "have a named export"
    const actual = typeof captureStack
    const expected = "function"
    assert({ given, should, actual, expected })
  }

  {
    const given = "an index re-export of captureStack"
    const should = "be identical to captureStack"
    const actual = indexExport
    const expected = captureStack
    assert({ given, should, actual, expected })
  }
})

describe("capture-stack/parseLine", async assert => {
  {
    const given = `a line with a path`
    const should = `parse`
    const expected = parsedLine
    const actual = parseLine(exampleLine)
    assert({ given, should, actual, expected })
  }

  {
    const exampleLine =
      "     at Generator.next (<anonymous>)"
    const given = `a line without a path`
    const should = `parse`
    const expected = {
      column: undefined,
      filename: "<anonymous>",
      line: "     at Generator.next (<anonymous>)",
      method: "Generator.next",
      dir: "",
      row: undefined,
    }
    const actual = parseLine(exampleLine)
    assert({ given, should, actual, expected })
  }
})

describe("capture-stack/keep", async assert => {
  const runTest = ([line, expected]) => {
    const given = inspect`${line}`
    const should = expected ? "keep it" : "not keep it"
    const actual = keep(line)
    assert({ given, should, actual, expected })
  }

  const lines = [
    [
      "  at captureStack (w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.js:11:9)",
      true,
    ],
    [
      "  at _9c4‍.r.describe (w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.test.js:41:17)",
      true,
    ],
    [
      "  at describe (w:\\@mwm\\tapa\\src\\describe\\describe.js:62:9)",
      true,
    ],
    [
      "  at Object.<anonymous> (w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.test.js:17:1)",
      true,
    ],
    ["  at Generator.next (<anonymous>)", true],
    [
      "  at bl (W:\\@mwm\\tapa\\node_modules\\.registry.npmjs.org\\esm\\3.2.25\\node_modules\\esm\\esm.js:1:245412)",
      false,
    ],
    [
      "  at kl (W:\\@mwm\\tapa\\node_modules\\.registry.npmjs.org\\esm\\3.2.25\\node_modules\\esm\\esm.js:1:247659)",
      false,
    ],
    [
      "  at Object.u (W:\\@mwm\\tapa\\node_modules\\.registry.npmjs.org\\esm\\3.2.25\\node_modules\\esm\\esm.js:1:287740)",
      false,
    ],
    [
      "  at Object.o (W:\\@mwm\\tapa\\node_modules\\.registry.npmjs.org\\esm\\3.2.25\\node_modules\\esm\\esm.js:1:287137)",
      false,
    ],
    [
      "  at Object.<anonymous> (W:\\@mwm\\tapa\\node_modules\\.registry.npmjs.org\\esm\\3.2.25\\node_modules\\esm\\esm.js:1:284879)",
      false,
    ],
    [
      "  at W:\\@mwm\\tapa\\node_modules\\.registry.npmjs.org\\esm\\3.2.25\\node_modules\\esm\\esm.js:1:284879",
      false,
    ],
  ]
  lines.forEach(runTest)
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

  const stack = parseError(exampleError)

  {
    const { toString, ...actual } = stack.lines[0]
    const expected = {
      method: "captureStack",
      column: 9,
      row: 11,
      dir: "w:\\@mwm\\tapa\\src\\capture-stack",
      filename: "captureStack.js",
      line:
        "        at captureStack (w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.js:11:9)",
    }
    const given = "parseError(...)"
    const should = inspect`include "${expected}"`
    assert({ given, should, actual, expected })
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
