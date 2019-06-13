import test from "tape"
import { describe } from "./describe"
import { describe as indexExport } from "."

test("describe module", assert => {
  {
    const given = 'module named "./describe"'
    const should = 'have an export named "describe"'
    const message = `given ${given}; should ${should}`
    const actual = typeof describe
    const expected = "function"
    assert.deepEqual(actual, expected, message)
  }

  {
    const given = 'index export "./describe"'
    const should = "be identical to mamed export"
    const message = `given ${given}; should ${should}`
    const actual = indexExport
    const expected = describe
    assert.deepEqual(actual, expected, message)
  }

  assert.end()
})
