'use strict'

const { equals, isSomething, getDefaultPredicate } = require('./predicate')
const { assert } = require('.')
const { printReport } = require('../reporter')

const predicate = v => !!v

const tests = [
  assert({
    actual: getDefaultPredicate({ predicate: predicate }),
    expected: predicate,
    message: 'default when a predicate is defined should be that predicate'
  }),
  assert({
    expected: isSomething,
    actual: getDefaultPredicate({}),
    message: 'default when no expected, and no predicate, should be isSomething'
  }),
  assert({
    expected: equals,
    actual: getDefaultPredicate({ expected: 'foo' }),
    message: 'default when expected but no predicate should be equals'
  })
]

printReport(tests)
