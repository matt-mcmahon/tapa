"use strict"

const test = require("../node-assert")
const getDefaultMessage = require("./message")

test(
  __filename,
  t => {
    const expected = "default message"
    const actual = getDefaultMessage({
      message: "default message"
    })
    const message = `Should be "${expected}" not "${actual}"`
    t.deepStrictEqual(actual, expected, message)
  },
  t => {
    const expected = "Assert(Expected(1), Actual(1))"
    const actual = getDefaultMessage({
      expected: 1,
      actual: 1
    })
    const message = `Should be "${expected}" not "${actual}"`
    t.deepStrictEqual(actual, expected, message)
  },
  t => {
    const expected = "Assert(Actual(1))"
    const actual = getDefaultMessage({
      actual: 1
    })
    const message = `Should be "${expected}" not "${actual}"`
    t.deepStrictEqual(actual, expected, message)
  }
)
