import { describe, Try } from "riteway"
import {
  map,
  invoker,
  iife,
  toUnary,
} from "@mwm/functional"

import { inspect } from "../inspect"
import { status, pending, passing, failing } from "./status"
import { status as indexExport } from "."

describe("status module", async assert => {
  {
    const given = inspect`module named ${"./status"}`
    const should = inspect`have an export named ${status}`
    const actual = typeof status
    const expected = "function"
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`index export`
    const should = inspect`be identical to named export`
    const actual = indexExport
    const expected = status
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`status ${pending}`
    const should = inspect`be like ${"pending"}`
    const actual = pending == "pending"
    const expected = true
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`status ${passing}`
    const should = inspect`be like ${"passing"}`
    const actual = passing == "passing"
    const expected = true
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`status ${failing}`
    const should = inspect`be like ${"failing"}`
    const actual = failing == "failing"
    const expected = true
    assert({ given, should, actual, expected })
  }

  const invariant = ({ actual, expected }) => {
    return {
      actual,
      expected,
      status: actual === expected ? passing : failing,
    }
  }

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

  examples.pending = {
    pending: 3,
    passing: 3,
    failing: 1,
    total: 7,
  }

  examples.resolved = {
    pending: 0,
    passing: 5,
    failing: 2,
    total: 7,
  }

  {
    const { invariants, ...actual } = status(...examples)
    const expected = examples.pending
    const given = inspect`array of values and promises`
    const should = inspect`have status ${expected}`
    assert({ given, should, actual, expected })
  }

  {
    const actual = await Promise.all(examples)
      .then(toUnary(status))
      .then(({ invariants: ignored, ...actual }) => actual)
    const expected = examples.resolved
    const given = inspect`resolved promises`
    const should = inspect`have status ${expected}`
    assert({ given, should, actual, expected })
  }
})
