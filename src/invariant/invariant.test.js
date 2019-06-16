import { describe, Try } from "riteway"
import { inspect } from "util"
import { invariant } from "./invariant.js"
import { invariant as indexExport } from "."

describe("invariant module", async assert => {
  assert({
    given: '"invariant" import',
    should: "be a function",
    actual: typeof invariant,
    expected: "function",
  })

  assert({
    given: "indexExport",
    should: 'be identical to "invariant" export',
    actual: indexExport,
    expected: invariant,
  })

  // Passing Invariant
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

  // Failing Invariant
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
    }
    const i = invariant(a)

    assert({
      given: `failing invariant(${inspect(a)})`,
      should: `augment with ${inspect(b)}`,
      actual: i,
      expected: {
        ...a,
        ...b,
      },
    })

    assert({
      given: "an invariant, i",
      should: "be frozen",
      actual: Object.isFrozen(i),
      expected: true,
    })

    assert({
      given: "an invariant, i",
      should: "have a non-enumerable method, of",
      actual: typeof i.of,
      expected: "function",
    })
  }
})
