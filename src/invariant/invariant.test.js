import { describe, Try } from "riteway"
import { inspect } from "util"
import {
  invariant as namedExport,
  default as invariant,
} from "./invariant.js"
import { invariant as indexExport } from "."

describe("invariant module", async assert => {
  assert({
    given: '"invariant" import',
    should: "be a function",
    actual: typeof invariant,
    expected: "function",
  })

  assert({
    given: "namedExport",
    should: 'be identical to "invariant" export',
    actual: namedExport,
    expected: invariant,
  })

  assert({
    given: "indexExport",
    should: 'be identical to "invariant" export',
    actual: indexExport,
    expected: invariant,
  })

  {
    const a = {
      given: "A",
      should: "B",
      actual: 14,
      expected: 14,
    }
    const b = {
      message: "given A; should B",
      result: true,
      of: invariant,
    }
    assert({
      given: `passing invariant(${inspect(a)})`,
      should: `augment with ${inspect(b)}`,
      actual: invariant(a),
      expected: {
        ...a,
        ...b,
      },
    })
  }
  {
    const a = {
      given: "A",
      should: "B",
      actual: 14,
      expected: 2,
    }
    const b = {
      message: "given A; should B",
      result: false,
      of: invariant,
    }
    assert({
      given: `failing invariant(${inspect(a)})`,
      should: `augment with ${inspect(b)}`,
      actual: invariant(a),
      expected: {
        ...a,
        ...b,
      },
    })
  }
})
