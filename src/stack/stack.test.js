import { describe, Try } from "riteway"
import { inspect } from "../inspect"
import { captureStack } from "./stack"
import { captureStack as indexExport } from "."

describe("stack module", async assert => {
  {
    const given = inspect`module named ${"./stack"}`
    const should = inspect`have an export named ${captureStack}`
    const actual = typeof captureStack
    const expected = "function"
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`index export`
    const should = inspect`be identical to named export`
    const actual = indexExport
    const expected = captureStack
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`TapaError`
    const should = inspect`be an array`
    const actual = Array.isArray(captureStack())
    const expected = true
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`normal Error`
    const should = inspect`have a string stack`
    const { stack } = new Error("testing")
    const actual = typeof stack
    const expected = "string"
    assert({ given, should, actual, expected })
  }
})
