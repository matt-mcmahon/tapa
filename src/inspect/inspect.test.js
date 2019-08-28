import { test as describe } from "tap"

import { inspect, configure } from "./inspect"
import { inspect as indexExport } from "."

describe("inspect module", async assert => {
  {
    const given = 'module named "./inspect"'
    const should = 'have an export named "inspect"'
    const actual = typeof inspect
    const expected = "function"
    assert({ given, should, actual, expected })
  }

  {
    const given = 'index export "./inspect"'
    const should = "be identical to named export"
    const actual = indexExport
    const expected = inspect
    assert({ given, should, actual, expected })
  }

  const one = { one: "one" }
  {
    const expected = "one { one: [32m'one'[39m } two"
    const actual = inspect`one ${one} two`
    const given = `${actual}`
    const should = `be ${expected}`
    assert({ given, should, expected, actual })
  }

  {
    const expected = "one { one: 'one' } two"
    const actual = configure({
      color: false,
    })`one ${one} two`
    const given = `${actual}`
    const should = `be ${expected}`
    assert({ given, should, expected, actual })
  }
})
