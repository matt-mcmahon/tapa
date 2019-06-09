import { describe } from "riteway"
import {
  assert as namedExport,
  default as tapaAssert,
} from "./assert.js"
import { assert as indexExport } from "."

describe("assert module", async assert => {
  assert({
    given: 'a module named "./assert.js"',
    should: "have a default export",
    actual: typeof tapaAssert,
    expected: "function",
  })

  assert({
    given:
      'import { assert as namedExport } from "./assert.js"',
    should: "be identical to default export",
    actual: namedExport,
    expected: tapaAssert,
  })

  assert({
    should: "be identical to default export",
    actual: indexExport,
    expected: tapaAssert,
  })

  assert.end()
})
