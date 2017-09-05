'use strict'

const { getDefaultMessage } = require('./message')
const { assert } = require('.')
const { printReport } = require('../reporter')

const tests = [
  assert({
    message: `should be: "Assert(Expected(1), Actual(1))"`,
    expected: 'Assert(Expected(1), Actual(1))',
    actual: getDefaultMessage({
      expected: 1,
      actual: 1
    })
  }),
  assert({
    message: `should be: "Assert(Actual(1))"`,
    expected: 'Assert(Actual(1))',
    actual: getDefaultMessage({
      actual: 1
    })
  })
]

printReport(tests)
