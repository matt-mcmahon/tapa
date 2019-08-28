import { test as describe } from "tap"
import { assert as indexExport } from "."
import { inspect } from "../inspect"
import { failing, passing } from "../status"
import { assert } from "./assert"

const tape = assert => {
  return ({ given, should, actual, expected }) => {
    assert.same(
      actual,
      expected,
      `given ${given}; should ${should}`
    )
  }
}

describe("assert module", async __assert => {
  const tap = tape(__assert)

  {
    const given = '"assert" import'
    const should = "be a function"
    const actual = typeof assert
    const expected = "function"
    tap({ given, should, actual, expected })
  }

  {
    const given = "indexExport"
    const should = 'be identical to "assert" export'
    const actual = indexExport
    const expected = assert
    tap({ given, should, actual, expected })
  }

  // Passing Assertion
  {
    const promise = assert({
      given: "A",
      should: "B",
      actual: 14,
      expected: 14,
    })

    {
      const given = inspect`assert(${promise})`
      const should = inspect`return a Promise`
      const actual = promise instanceof Promise
      const expected = true
      tap({ given, should, actual, expected })
    }

    const assertion = await promise

    {
      const actual = assertion
      const expected = {
        given: "A",
        should: "B",
        actual: 14,
        expected: 14,
        status: passing,
      }
      const given = inspect`passing assertion`
      const should = inspect`be ${expected}`
      tap({ given, should, actual, expected })
    }

    {
      const actual = "" + assertion
      const given = "an assertion"
      const should = inspect`coerce to ${actual}`
      const expected = `${passing} given A; should B`
      tap({ given, should, actual, expected })
    }

    {
      const given = inspect`${assertion}`
      const should = inspect`be frozen`
      const actual = Object.isFrozen(assertion)
      const expected = true
      tap({ given, should, actual, expected })
    }
  }

  // Failing Assertion
  {
    const promise = assert({
      given: "A",
      should: "B",
      actual: 14,
      expected: 2,
    })

    {
      const given = inspect`assert(${promise})`
      const should = inspect`return a Promise`
      const actual = promise instanceof Promise
      const expected = true
      tap({ given, should, actual, expected })
    }

    const { stack, ...assertion } = await promise

    {
      const actual = assertion
      const expected = {
        given: "A",
        should: "B",
        actual: 14,
        expected: 2,
        status: failing,
      }
      const given = inspect`a failing assertion`
      const should = inspect`be ${expected}`
      tap({ given, should, actual, expected })
    }

    {
      const given = inspect`a failing assertion`
      const should = inspect`have a stack`
      const actual = stack && stack.length > 0
      const expected = true
      tap({ given, should, actual, expected })
    }
  }

  // Pending Assertion
  {
    const block = Promise.resolve({
      given: "A",
      should: "B",
      actual: 14,
      expected: 14,
    })

    const promise = assert(block)

    {
      const given = inspect`assert(${block})`
      const should = inspect`return a Promise`
      const actual = promise instanceof Promise
      const expected = true
      tap({ given, should, actual, expected })
    }

    const { stack, ...assertion } = await promise

    {
      const given = inspect`await ${promise}`
      const should = inspect`resolve`
      const actual = assertion
      const expected = {
        given: "A",
        should: "B",
        actual: 14,
        expected: 14,
        status: passing,
      }
      tap({ given, should, actual, expected })
    }
  }
})
