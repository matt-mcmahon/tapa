import { describe, Try } from "riteway"
import { assert } from "./assert"
import { assert as indexExport } from "."
import { fail } from "assert"

describe("assert module", async t => {
  t({
    given: 'module named "./assert"',
    should: 'have an export named "assert"',
    actual: typeof assert,
    expected: "function",
  })

  t({
    given: 'index export "./assert"',
    should: "be identical to named export",
    actual: indexExport,
    expected: assert,
  })

  {
    const given = "a valid invariant"
    const should = "pass"
    const a = assert({
      given: "valid",
      should: "pass",
      actual: true,
      expected: true,
    })
    const actual = {
      pass: a.pass,
      fail: a.fail,
      total: a.total,
    }
    const expected = {
      pass: 1,
      fail: 0,
      total: 1,
    }
    t({ given, should, actual, expected })
  }

  const given = "an invalid invariant"
  const should = "fail"
  const a = assert({
    given: "invalid",
    should: "fail",
    actual: false,
    expected: true,
  })

  {
    const actual = {
      pass: a.pass,
      fail: a.fail,
      total: a.total,
    }
    const expected = {
      pass: 0,
      fail: 1,
      total: 1,
    }
    t({ given, should, actual, expected })
  }

  {
    const given = "an invariant"
    const should = "have a stack"
    const actual = typeof a.invariant.stack
    const expected = "object"
    t({ given, should, actual, expected })
  }
})
