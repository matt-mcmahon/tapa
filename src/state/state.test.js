import { describe } from "riteway"
import { iife, toUnary } from "@mwm/functional"

import { inspect } from "../inspect"
import { passing, failing } from "../status"

import { state } from "./state"
import { state as indexExport } from "."

describe("state module", async assert => {
  {
    const given = inspect`module named ${"./state"}`
    const should = inspect`have an export named ${state}`
    const actual = typeof state
    const expected = "function"
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`index export`
    const should = inspect`be identical to named export`
    const actual = indexExport
    const expected = state
    assert({ given, should, actual, expected })
  }

  const invariant = ({ actual, expected }) => ({
    actual,
    expected,
    status: expected === actual ? passing : failing,
  })

  const examples = iife(() => {
    const v = v => v
    const p = v => Promise.resolve(v)
    return [
      v(invariant({ actual: "A", expected: "A" })),
      p(invariant({ actual: "B", expected: "B" })),
      v(invariant({ actual: "c", expected: "C" })),
      p(invariant({ actual: "d", expected: "D" })),
      p(invariant({ actual: "E", expected: "E" })),
      v(invariant({ actual: "F", expected: "F" })),
      v(invariant({ actual: "G", expected: "G" })),
    ]
  })

  const s0 = state(...examples)

  {
    const { invariants, ...actual } = s0
    const expected = {
      pending: 3,
      passing: 3,
      failing: 1,
      total: 7,
      history: [],
    }
    const given = inspect`array of values and promises`
    const should = inspect`have status ${expected}`
    assert({ given, should, actual, expected })
  }

  const s0p = await s0.promise

  {
    const { invariants: _, ...actual } = s0p
    const expected = {
      pending: 0,
      passing: 5,
      failing: 2,
      total: 7,
      history: [s0],
    }
    const given = inspect`resolved promises`
    const should = inspect`have new status of ${{
      pending: 0,
      passing: 5,
      failing: 2,
      total: 7,
    }}`
    assert({ given, should, actual, expected })
  }

  const iH = invariant({ actual: "H", expected: "H" })
  const s1 = s0p.update(iH)

  {
    const given = inspect`an additional invariant ${iH}`
    const should = inspect`update status`
    const actual = {
      pending: s1.pending,
      passing: s1.passing,
      failing: s1.failing,
      total: s1.total,
      history: s1.history,
    }
    const expected = {
      pending: 0,
      passing: 6,
      failing: 2,
      total: 8,
      history: [s0, s0p],
    }
    assert({ given, should, actual, expected })
  }
})
