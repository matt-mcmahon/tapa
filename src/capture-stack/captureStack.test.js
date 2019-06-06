import { fileURLToPath } from "url"
import { iife } from "@mwm/functional"

import { describe, dtsExists } from "../describe"
import { captureStack as indexExport } from "."
import {
  parseLine,
  keep,
  truncate,
  capture,
  captureStack as namedExport,
  default as captureStack,
} from "./captureStack"

const line = `  at captureStack (w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.js:11:9)`
const parsedLine = {
  column: "11",
  filename: "captureStack.js",
  line:
    "  at captureStack (w:\\@mwm\\tapa\\src\\capture-stack\\captureStack.js:11:9)",
  method: "captureStack",
  path: "w:@mwm\tapasrccapture-stackcaptureStack.js:11:9",
  row: "9",
}

describe("capture-stack/split-line", async assert => {
  assert({
    given: `the line ${line}`,
    should: "parse",
    expected: parsedLine,
    actual: parseLine(line),
  })
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

  assert(dtsExists(import.meta.url, "captureStack"))

  const stack = captureStack(describe)

  assert({
    given: `captureStack()`,
    should: `return a string`,
    actual: typeof captureStack(),
    expected: "string",
  })

  {
    const expected = true
    const actual = stack.length > 1
    const given = ""
    const should = `it's length should be greater than 1, not ${actual}`
    assert({ given, should, actual, expected })
  }

  {
    const file = fileURLToPath(import.meta.url)
    const actual = stack.includes(file)
    const expected = true
    const given = "stack trace"
    const should = `should include "${file}" path`
    assert({ given, should, actual, expected })
  }
})
