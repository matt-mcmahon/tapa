import { describe as rw } from "riteway"
import { describe as indexExport } from "."
import { inspect } from "../inspect"
import { describe } from "./describe"

rw("describe module", async assert => {
  {
    const given = inspect`module named ${"./describe"}`
    const should = inspect`have an export named ${describe}`
    const actual = typeof describe
    const expected = "function"
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`index export`
    const should = inspect`be identical to named export`
    const actual = indexExport
    const expected = describe
    assert({ given, should, actual, expected })
  }

  const description = "my description"
  const plan = async assert => {
    {
      const given = inspect`a test assertion`
      const should = inspect`do something?`
      const actual = "A"
      const expected = "A"
      assert({ given, should, actual, expected })
    }
  }
  const d0 = describe
  const d0promise = d0(description, plan)

  {
    const given = inspect`describe(${description}, ${plan})`
    const should = inspect`be a ${Promise}`
    const actual = d0promise instanceof Promise
    const expected = true
    assert({ given, should, actual, expected })
  }

  const s0 = await d0promise

  {
    const actual = s0.summary
    const expected = {
      pending: 0,
      passing: 1,
      failing: 0,
      length: 1,
    }
    const given = inspect`resolved ${d0promise}.summary`
    const should = inspect`be ${expected}`
    assert({ given, should, actual, expected })
  }
})
