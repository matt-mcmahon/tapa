import { describe } from "riteway"
import { iife, prop } from "@mwm/functional"

import { inspect } from "../inspect"
import { passing, failing } from "../status"

import { state } from "./state"
import { state as indexExport } from "."

describe("state module", async assert => {
  {
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

  const s0 = state("my-state", ...examples)

  {
    {
      const actual = s0.label
      const expected = "my-state"
      const given = inspect`s0.label`
      const should = inspect`be ${expected}`
      assert({ given, should, actual, expected })
    }

    {
      const actual = s0.length
      const expected = 7
      const given = inspect`s0.length`
      const should = inspect`be ${expected}`
      assert({ given, should, actual, expected })
    }

    {
      const actual = s0.summary
      const expected = {
        pending: 3,
        passing: 3,
        failing: 1,
        length: 7,
      }
      const given = inspect`s0.summary`
      const should = inspect`have summary ${expected}`
      assert({ given, should, actual, expected })
    }
  }

  const iH = a({ actual: "H", expected: "H" })
  const s1promise = s0.next(iH)
  const { value: s1, done: s1done } = await s1promise

  {
    {
      const actual = s1promise instanceof Promise
      const expected = true
      const given = inspect`s1.next()`
      const should = inspect`should return a ${Promise}`
      assert({ given, should, actual, expected })
    }

    {
      const actual = s1done
      const expected = false
      const given = inspect`s1`
      const should = inspect`should not be done`
      assert({ given, should, actual, expected })
    }

    {
      const actual = s1.summary
      const expected = {
        pending: 3,
        passing: 4,
        failing: 1,
        length: 8,
      }
      const given = inspect`s1.summary`
      const should = inspect`be ${expected}`
      assert({ given, should, actual, expected })
    }

    {
      const actual = [...s1]
      const expected = s1.history
      const given = inspect`[...s1]`
      const should = inspect`be s1.history`
      assert({ given, should, actual, expected })
    }

    {
      const actual = [...s1]
      const expected = [s0]
      const given = inspect`s1.history`
      const should = inspect`be ${expected.map(
        prop("name")
      )}`
      assert({ given, should, actual, expected })
    }
  }

  const s2promise = s1.next()
  const { value: s2, done: s2done } = await s2promise

  {
    {
      const actual = s2promise instanceof Promise
      const expected = true
      const given = inspect`s2promise = s1.next()`
      const should = inspect`be a ${Promise}`
      assert({ given, should, actual, expected })
    }

    {
      const actual = s2.summary
      const expected = {
        pending: 0,
        passing: 6,
        failing: 2,
        length: 8,
      }
      const given = inspect`s2.summary`
      const should = inspect`be ${expected}`
      assert({ given, should, actual, expected })
    }

    {
      const actual = [...s2]
      const expected = [s0, s1]
      const given = inspect`s2.history`
      const should = inspect`should be ${expected.map(
        prop("name")
      )}`
      assert({ given, should, actual, expected })
    }

    {
      const actual = s2done
      const expected = false
      const given = inspect`s2`
      const should = inspect`should not be done`
      assert({ given, should, actual, expected })
    }
  }

  const s3promise = s2.next()
  const { value: s3, done: s3done } = await s3promise

  {
    {
      const actual = s3promise instanceof Promise
      const expected = true
      const given = inspect`s2.next() as ${s3promise}`
      const should = inspect`be a ${Promise}`
      assert({ given, should, actual, expected })
    }

    {
      const actual = s3
      const expected = undefined
      const given = inspect`s3`
      const should = inspect`should be ${expected}`
      assert({ given, should, actual, expected })
    }

    {
      const actual = s3done
      const expected = true
      const given = inspect`s3`
      const should = inspect`should be done`
      assert({ given, should, actual, expected })
    }
  }
})
