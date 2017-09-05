'use strict'

const { printReport } = require('.')

const { assert } = require('../assert')

const test = [
  assert({
    expected: 1,
    actual: 1,
    message: 'should pass'
  }),
  assert.fails({
    verbose: true,
    expected: 1,
    actual: 2,
    message: `should pass with a GREEN error report`
  }),
  assert({
    expected: 1,
    actual: 1,
    message: 'should pass'
  }),
  assert.ignore({
    expected: 1,
    actual: 2,
    message: `should fail with a RED error report`
  })
]

printReport(test)
