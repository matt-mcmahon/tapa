'use strict'

const assert = require('./assert')
const { printReport } = require('../reporter')
const R = require('ramda')
const { equals, F } = R

const tests = [
  assert.comment(
    'next assert should pass using default message'
  ),
  assert({
    expected: 1,
    actual: 1
  }),
  assert.fails({
    message: `this invariant will fail, but the assertion should pass`,
    predicate: F
  }),
  assert({
    message: `should pass because it's something`,
    actual: 'something'
  }),
  assert.fails({
    message: `should fail because it's nothing`,
    actual: []
  }),
  assert.fails({
    message: `empty string is empty`,
    actual: ''
  }),
  assert({
    message: `"full" string is NOT empty`,
    actual: 'full'
  }),
  assert({
    message: `1 should equal 1, using implied predicate`,
    expected: 1,
    actual: 1
  }),
  assert({
    message: `1 should equal 1, using explicit predicate`,
    predicate: equals,
    expected: 1,
    actual: 1
  }),
  assert.fails({
    message: `1 should NOT equal 2, using implied predicate`,
    expected: 2,
    actual: 1
  }),
  assert.fails({
    message: `1 should NOT equal 2, using explicit predicate`,
    predicate: equals,
    expected: 2,
    actual: 1
  })
]

printReport(tests)
