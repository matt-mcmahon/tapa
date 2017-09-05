const { assert } = require('.')
const reporter = require('../reporter')
const R = require('ramda')

const tests = [
  assert({
    message: `1 should equal 1`,
    predicate: R.equals,
    expected: 1,
    actual: 1
  }),
  assert({
    message: `1 should NOT equal 2`,
    predicate: R.complement(R.equals(1)),
    actual: 2
  }),
  assert({
    message: `empty string is empty`,
    predicate: R.isEmpty,
    actual: ''
  }),
  assert({
    predicate: R.equals,
    expected: 1,
    actual: 1
  }),
  assert({
    message: `should be nil`,
    predicate: R.isNil,
    actual: undefined
  }),
  assert({
    message: `This test should fail!`,
    predicate: R.F
  })
]

reporter(tests)
