import { test as describe } from "tap"
import { inspect } from "../inspect"
import { deepEqual } from "./deepEqual"
import { deepEqual as indexExport } from "."

describe("deepEqual module", async assert => {
  {
    const given = inspect`module named ${"./deepEqual"}`
    const should = inspect`have an export named ${deepEqual}`
    const actual = typeof deepEqual
    const expected = "function"
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`index export`
    const should = inspect`be identical to named export`
    const actual = indexExport
    const expected = deepEqual
    assert({ given, should, actual, expected })
  }

  {
    const a = { a: "a value", b: ["a", "b"] }
    const b = { a: "a value", b: ["a", "b"] }
    const given = inspect`equivelent objects`
    const should = inspect`return ${true}`
    const actual = deepEqual(a)(b)
    const expected = true
    assert({ given, should, actual, expected })
  }

  {
    const a = { a: "a value", b: ["a", "b"] }
    const b = { a: "a value", b: ["a", "b", "c"] }
    const given = inspect`equivelent objects`
    const should = inspect`return ${false}`
    const actual = deepEqual(a)(b)
    const expected = false
    assert({ given, should, actual, expected })
  }
})
