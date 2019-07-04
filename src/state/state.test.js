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

  const s = state(...examples)

  {
    const { invariants, ...actual } = s
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

  {
    const { invariants: _, ...actual } = await s.promise
    const expected = {
      pending: 0,
      passing: 5,
      failing: 2,
      total: 7,
      history: [s],
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
})
