'use strict'

const nodeAssert = require('assert')
const { AssertionError } = nodeAssert

const R = require('ramda')
const { equals, F } = R

const plan = []

const tapaAssert = require('./assert')(plan)

tapaAssert.comment(
  'next assert should pass using default message'
)

tapaAssert({
  expected: 1,
  actual: 1
})

tapaAssert.fails({
  message: `this invariant will fail, but the assertion should pass`,
  predicate: F
})

tapaAssert({
  message: `should pass because it's something`,
  actual: 'something'
})

tapaAssert.fails({
  message: `should fail because it's nothing`,
  actual: []
})

tapaAssert.fails({
  message: `empty string is empty`,
  actual: ''
})

tapaAssert({
  message: `"full" string is NOT empty`,
  actual: 'full'
})

tapaAssert({
  message: `1 should equal 1, using implied predicate`,
  expected: 1,
  actual: 1
})

tapaAssert({
  message: `1 should equal 1, using explicit predicate`,
  predicate: equals,
  expected: 1,
  actual: 1
})

tapaAssert.fails({
  message: `1 should NOT equal 2, using implied predicate`,
  expected: 2,
  actual: 1
})

tapaAssert.fails({
  message: `1 should NOT equal 2, using explicit predicate`,
  predicate: equals,
  expected: 2,
  actual: 1
})

{
  const expected = 11
  const actual = plan.length
  const message = `plan.length should be ${expected} not ${actual}`
  nodeAssert.deepStrictEqual(actual, expected, message)
}

{
  const expected = 11
  const actual = plan.reduce((count, v) => {
    return v.cata(fail => {
      throw new AssertionError(fail)
    }, pass => {
      return count + 1
    })
  }, 0)
  const message = `${expected} tests should pass, not ${actual}`
  nodeAssert.deepStrictEqual(actual, expected, message)
}
