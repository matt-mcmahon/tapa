import { describe, Try } from "riteway"
import { inspect } from "../inspect"
import { print } from "./print"
import { print as indexExport } from "."

describe("print module", async assert => {
  {
    const given = inspect`module named ${"./print"}`
    const should = inspect`have an export named ${print}`
    const actual = typeof print
    const expected = "function"
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`index export`
    const should = inspect`be identical to named export`
    const actual = indexExport
    const expected = print
    assert({ given, should, actual, expected })
  }
})
