import { describe, Try } from "riteway"
import {
  Invariant,
  invariant as namedExport,
  default as invariant,
} from "./invariant.js"
import { invariant as indexExport } from "."

describe("invariant module", async assert => {
  assert({
    given: 'a module named "./invariant.js"',
    should: "have a default export",
    actual: typeof invariant,
    expected: "function",
  })

  assert({
    given:
      'import { invariant as namedExport } from "./invariant.js"',
    should: "be identical to default export",
    actual: namedExport,
    expected: invariant,
  })

  assert({
    should: "be identical to default export",
    actual: indexExport,
    expected: invariant,
  })
})
