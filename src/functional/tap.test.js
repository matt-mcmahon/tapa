'use strict'

const tap = require('./tap')
const test = require('../node-assert')

test('tap executes a function, returns original value', t => {
  const actual = tap(x => x * 2)(3)
  const expected = 3
  t.equal(actual, expected, 'original value should not change')
})
