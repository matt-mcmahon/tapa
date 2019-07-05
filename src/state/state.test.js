import { iife } from "@mwm/functional"
import { describe } from "riteway"
import { state as indexExport } from "."
import { inspect } from "../inspect"
import { failing, passing } from "../status"
import { state } from "./state"

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

  const a = ({ actual, expected }) => ({
    actual,
    expected,
    status: expected === actual ? passing : failing,
  })

  const examples = iife(() => {
    const v = v => v
    const p = v => Promise.resolve(v)
    return [
      v(a({ actual: "A", expected: "A" })),
      p(a({ actual: "B", expected: "B" })),
      v(a({ actual: "c", expected: "C" })),
      p(a({ actual: "d", expected: "D" })),
      p(a({ actual: "E", expected: "E" })),
      v(a({ actual: "F", expected: "F" })),
      v(a({ actual: "G", expected: "G" })),
    ]
  })

  const s7 = state("s7", ...examples)

  {
    const { summary: actual } = s7
    const expected = {
      pending: 3,
      passing: 3,
      failing: 1,
      total: 7,
    }
    const given = inspect`state with values and promises`
    const should = inspect`have status ${expected}`
    assert({ given, should, actual, expected })
  }

  const s7p = await s7.promise

  {
    const { summary, history } = s7p

    {
      const actual = summary
      const expected = {
        pending: 0,
        passing: 5,
        failing: 2,
        total: 7,
      }
      const given = inspect`resolved summary`
      const should = inspect`be ${expected}`
      assert({ given, should, actual, expected })
    }

    {
      const actual = history
      const expected = [s7]
      const given = inspect`resolved history`
      const should = inspect`be ${["s7"]}`
      assert({ given, should, actual, expected })
    }
  }

  const iH = a({ actual: "H", expected: "H" })
  const s8 = s7.add(iH)
  const s8p = await s8.promise

  {
    const { summary, history } = await s8p
    {
      const actual = summary
      const expected = {
        pending: 0,
        passing: 6,
        failing: 2,
        total: 8,
      }
      const given = inspect`an additional assertion ${iH}`
      const should = inspect`update status`
      assert({ given, should, actual, expected })
    }

    {
      const actual = history
      const expected = [s7, s8]
      const given = inspect`history after add(${iH})`
      const should = inspect`be ${["s7", "s8"]}`
      assert({ given, should, actual, expected })
    }
  }
})
