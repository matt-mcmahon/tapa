import { describe } from "riteway"

import { inspect } from "../inspect"
import {
  isPending,
  isPassing,
  isFailing,
  passing,
} from "../status"

import { assert as myAssert } from "./assert"
import { assert as indexExport } from "."

describe("assert module", async assert => {
  {
    const given = inspect`module named ${"./assert"}`
    const should = inspect`have an export named ${assert}`
    const actual = typeof myAssert
    const expected = "function"
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`index export`
    const should = inspect`be identical to named export`
    const actual = indexExport
    const expected = myAssert
    assert({ given, should, actual, expected })
  }

  // Passing Invariant
  {
    const invariant = await myAssert({
      given: "valid",
      should: "pass",
      actual: true,
      expected: true,
    })

    const given = inspect`isPassing(${invariant})`
    const should = inspect`be ${true}`
    const actual = isPassing(invariant.status)
    const expected = true
    assert({ given, should, actual, expected })
  }

  // Failing Invariant
  {
    const invariant = await myAssert({
      actual: false,
      expected: true,
      given: "invalid",
      should: "fail",
    })

    {
      const actual = isFailing(invariant)
      const expected = true
      const given = "an invalid invariant"
      const should = "fail"
      assert({ given, should, actual, expected })
    }

    {
      const given = "a failing invariant"
      const should = "have a stack"
      const actual = typeof invariant.stack
      const expected = "object"
      assert({ given, should, actual, expected })
    }
  }

  // Pending Invariant
  {
    const invariant = myAssert(
      Promise.resolve({
        given: "A",
        should: "A",
        actual: "A",
        expected: "A",
      })
    )

    {
      const given = inspect`isPending(${invariant})`
      const should = inspect`be ${true}`
      const actual = isPending(invariant)
      const expected = true
      assert({ given, should, actual, expected })
    }

    {
      const actual = await invariant
      const expected = {
        given: "A",
        should: "A",
        actual: "A",
        expected: "A",
        status: passing,
      }
      const given = inspect`await ${invariant}`
      const should = inspect`resolve`
      assert({ given, should, actual, expected })
    }

    {
      const given = inspect`resolved invariant`
      const should = inspect`pass`
      const actual = isPassing(await invariant)
      const expected = true
      assert({ given, should, actual, expected })
    }
  }
})
