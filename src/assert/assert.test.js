'use strict'

const nodeAssert = require('assert')
const { AssertionError } = nodeAssert

const R = require('ramda')
const { equals, F } = R

const mockPlan = []

const tapaAssert = require('./assert')

{
  const expected = 'function'
  const actual = typeof tapaAssert
  const message = `tapaAssert should be a function`
  nodeAssert.deepStrictEqual(actual, expected, message)
}

{
  const expected = 'function'
  const actual = typeof tapaAssert.of
  const message = `tapaAssert should have an "of" method`
  nodeAssert.deepStrictEqual(actual, expected, message)
}

const tapa = tapaAssert.of(mockPlan)

tapa.comment(
  'next assert should pass using default message'
)

tapa({
  expected: 1,
  actual: 1
})

tapa.fails({
  message: `this invariant will fail, but the assertion should pass`,
  predicate: F
})

tapa({
  message: `should pass because it's something`,
  actual: 'something'
})

tapa.fails({
  message: `should fail because it's nothing`,
  actual: []
})

tapa.fails({
  message: `empty string is empty`,
  actual: ''
})

tapa({
  message: `"full" string is NOT empty`,
  actual: 'full'
})

tapa({
  message: `1 should equal 1, using implied predicate`,
  expected: 1,
  actual: 1
})

tapa({
  message: `1 should equal 1, using explicit predicate`,
  predicate: equals,
  expected: 1,
  actual: 1
})

tapa.fails({
  message: `1 should NOT equal 2, using implied predicate`,
  expected: 2,
  actual: 1
})

tapa.fails({
  message: `1 should NOT equal 2, using explicit predicate`,
  predicate: equals,
  expected: 2,
  actual: 1
})

{
  const expected = 11
  const actual = mockPlan.length
  const message = `plan.length should be ${expected} not ${actual}`
  nodeAssert.deepStrictEqual(actual, expected, message)
}

{
  const expected = 11
  const actual = mockPlan.reduce((count, v) => {
    return v.cata(fail => {
      throw new AssertionError(fail)
    }, pass => {
      return count + 1
    })
  }, 0)
  const message = `${expected} tests should pass, not ${actual}`
  nodeAssert.deepStrictEqual(actual, expected, message)
}
