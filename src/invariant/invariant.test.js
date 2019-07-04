import { describe } from "riteway"

import { inspect } from "../inspect"
import { captureStack } from "../stack"
import {
  passing,
  failing,
  isPassing,
  isFailing,
} from "../status"

import { invariant } from "./invariant"
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
  const p = invariant({
    given: "A",
    should: "B",
    actual: 14,
    expected: 14,
    captureStack: () => captureStack(invariant),
  })

  {
    const { ...actual } = p
    const expected = {
      given: "A",
      should: "B",
      actual: 14,
      expected: 14,
      status: passing,
    }
    const given = inspect`passing invariant`
    const should = inspect`be ${expected}`
    assert({ given, should, actual, expected })
  }

  {
    const actual = "" + p
    const given = "an invariant"
    const should = inspect`coerce to ${actual}`
    const expected = `${passing} given A; should B`
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`an invariant, ${p}`
    const should = inspect`be frozen`
    const actual = Object.isFrozen(p)
    const expected = true
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`isPassing({ ..., status: ${passing} })`
    const should = inspect`be ${true}`
    const actual = isPassing(p)
    const expected = true
    assert({ given, should, actual, expected })
  }

  // Failing Invariant
  {
    const f = invariant({
      given: "A",
      should: "B",
      actual: 14,
      expected: 2,
      captureStack,
    })

    const { stack, ...actual } = f
    const expected = {
      given: "A",
      should: "B",
      actual: 14,
      expected: 2,
      status: failing,
    }
    const given = inspect`failing invariant`
    const should = inspect`be ${expected}`
    assert({ given, should, actual, expected })

    {
      const should = inspect`have a stack`
      const actual = stack.length > 0
      const expected = true
      assert({ given, should, actual, expected })
    }

    {
      const given = inspect`isFailing({ ..., status: ${failing} })`
      const should = inspect`be true`
      const actual = isFailing(f)
      const expected = true
      assert({ given, should, actual, expected })
    }
  }
})
