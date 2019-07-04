import { describe } from "riteway"

import { inspect } from "../inspect"
import { captureStack } from "../stack"

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

  {
    const given = "a valid invariant"

    const should = "pass"

    const asserted = await myAssert({
      given: "valid",
      should: "pass",
      actual: true,
      expected: true,
      captureStack,
    })

    const actual = {
      passing: asserted.passing,
      failing: asserted.failing,
      total: asserted.total,
    }

    const expected = {
      passing: 1,
      failing: 0,
      total: 1,
    }

    assert({ given, should, actual, expected })
  }

  const asserted = await myAssert({
    given: "invalid",
    should: "fail",
    actual: false,
    expected: true,
    captureStack,
  })

  {
    const given = "an invalid invariant"
    const should = "fail"
    const actual = {
      passing: asserted.passing,
      failing: asserted.failing,
      total: asserted.total,
    }
    const expected = {
      passing: 0,
      failing: 1,
      total: 1,
    }
    assert({ given, should, actual, expected })
  }

  {
    const i = asserted.invariants[0]
    const given = "an invariant"
    const should = "have a stack"
    const actual = typeof i.stack
    const expected = "object"
    assert({ given, should, actual, expected })
  }

  {
    const promise = Promise.resolve({
      given: "A",
      should: "A",
      actual: "A",
      expected: "A",
      captureStack,
    })
    const given = inspect`assert(${promise})`
    const should = inspect`be okay`
    const value = await myAssert(promise)
    const { invariants, ...actual } = value
    const expected = {
      pending: 0,
      passing: 1,
      failing: 0,
      total: 1,
    }
    assert({ given, should, actual, expected })
  }
})
