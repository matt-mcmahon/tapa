'use strict'

const assert = require('assert')
const getDefaultMessage = require('./message')

{
  const expected = 'default message'
  const actual = getDefaultMessage({
    message: 'default message'
  })
  const message = `Should be "${expected}" not "${actual}"`
  assert.deepStrictEqual(actual, expected, message)
}

{
  const expected = 'Assert(Expected(1), Actual(1))'
  const actual = getDefaultMessage({
    expected: 1,
    actual: 1
  })
  const message = `Should be "${expected}" not "${actual}"`
  assert.deepStrictEqual(actual, expected, message)
}

{
  const expected = 'Assert(Actual(1))'
  const actual = getDefaultMessage({
    actual: 1
  })
  const message = `Should be "${expected}" not "${actual}"`
  assert.deepStrictEqual(actual, expected, message)
}
