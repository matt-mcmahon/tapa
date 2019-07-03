import { describe } from "riteway"
import { inspect } from "../inspect"
import { invariant, Status } from "./invariant"
import { invariant as indexExport } from "."

describe("invariant module", async assert => {
  {
    const given = '"invariant" import'
    const should = "be a function"
    const actual = typeof invariant
    const expected = "function"
    assert({ given, should, actual, expected })
  }

  {
    const given = "indexExport"
    const should = 'be identical to "invariant" export'
    const actual = indexExport
    const expected = invariant
    assert({ given, should, actual, expected })
  }

  // Passing Invariant
  const passing = invariant({
    given: "A",
    should: "B",
    actual: 14,
    expected: 14,
  })

  {
    const { ...actual } = passing
    const expected = {
      given: "A",
      should: "B",
      actual: 14,
      expected: 14,
      status: Status.pending,
    }
    const given = inspect`passing invariant(${actual})`
    const should = inspect`augment with ${expected}`
    assert({ given, should, actual, expected })
  }

  {
    const given = "an invariant"
    const should = "coerce to string"
    const actual = "" + passing
    const expected = `[${Status.pending}] given A; should B`
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`an invariant, ${passing}`
    const should = inspect`be frozen`
    const actual = Object.isFrozen(passing)
    const expected = true
    assert({ given, should, actual, expected })
  }

  {
    const resolved = await passing.test()
    const given = inspect`resolved passing invariant, ${passing}`

    {
      const { status: actual } = resolved
      const expected = Status.passing
      const should = inspect`have status ${expected.toString()}`
      assert({ given, should, actual, expected })
    }

    {
      const should = inspect`coerce to ${"pass"} string`
      const actual = "" + resolved
      const expected = `[${
        Status.passing
      }] given A; should B`
      assert({ given, should, actual, expected })
    }
  }

  {
    // Failing Invariant
    const failing = invariant({
      given: "A",
      should: "B",
      actual: 14,
      expected: 2,
    })

    {
      const { ...actual } = failing
      const expected = {
        given: "A",
        should: "B",
        actual: 14,
        expected: 2,
        status: Status.pending,
      }
      const given = inspect`failing invariant, ${actual}`
      assert({ given, actual, expected })
    }

    const resolved = await failing.test()

    {
      const { status: actual } = { status: resolved.status }
      const expected = Status.failing
      const given = inspect`method ${failing.test}`
      const should = inspect`be ${expected}`
      assert({ given, should, actual, expected })
    }

    {
      const given = "a failing invariant"
      const should = inspect`coerce to ${"failing"} string`
      const actual = "" + resolved
      const expected = `[${
        Status.failing
      }] given A; should B`
      assert({ given, should, actual, expected })
    }
  }
})
