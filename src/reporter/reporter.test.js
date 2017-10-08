'use strict'

const { printReport } = require('.')

const plan = []
const assert = require('../assert').assert(plan)

assert({
  expected: 1,
  actual: 1,
  message: 'should pass'
})

assert.fails({
  verbose: true,
  expected: 1,
  actual: 2,
  message: `should pass with a GREEN error report`
})

assert({
  expected: 1,
  actual: 1,
  message: 'should pass'
})

assert({
  expected: 1,
  actual: 2,
  message: `should fail with a RED error report`,
  verbose: true
})

assert.ignore({
  expected: 1,
  actual: 2,
  message: `should be ignored with a Yellow error report`,
  verbose: true
})

printReport(plan)
