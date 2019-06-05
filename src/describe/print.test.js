import { describe } from "./describe"
import {
  print as namedExport,
  default as print,
} from "./print.js"
import { print as indexExport } from "./print"

describe("print module", async assert => {
  assert({
    given: 'a module named "./print.js"',
    should: "have a default export",
    actual: typeof print,
    expected: "function",
  })

  assert({
    given:
      'import { print as namedExport } from "./print.js"',
    should: "be identical to default export",
    actual: namedExport,
    expected: print,
  })

  assert({
    should: "be identical to default export",
    actual: indexExport,
    expected: print,
  })

  assert.fail("No Functionality Tests")
})
