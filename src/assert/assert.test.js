'use strict'

const { inspect } = require('util')
const nodeAssert = require('assert')

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

tapa({
  message: `this invariant will fail, but the assertion should pass`,
  predicate: F
})

tapa({
  message: `should pass because it's something`,
  actual: 'something'
})

tapa({
  message: `should fail because it's nothing`,
  actual: []
})

tapa.fails({
  message: `should fail because it's nothing, but will report as passing`,
  actual: []
})

tapa({
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

tapa({
  message: `1 should NOT equal 2, using implied predicate`,
  expected: 2,
  actual: 1
})

tapa({
  message: `1 should NOT equal 2, using explicit predicate`,
  predicate: equals,
  expected: 2,
  actual: 1
})

tapa(function shouldAcceptFunctions () {
  return true
})

{
  const expected = 13
  const actual = mockPlan.length
  const message = `plan.length should be ${expected} not ${actual}`
  nodeAssert.deepStrictEqual(actual, expected, message)
}

{
  const expected = [7, 5, 1]

  const actual = mockPlan
  .reduce(
    ([pass, fail, skip], i) => {
      nodeAssert.ok(R.has('stack', i), 'should have own property "stack"')
      nodeAssert.ok(i.stack.length > 0, 'stack length should be > 0')
      return i.run().cata(
        () => [pass, fail + 1, skip],
        v => v.skip
          ? [pass, fail, skip + 1]
          : [pass + 1, fail, skip]
      )
    },
    [0, 0, 0]
  )
  const message = `result should be ${inspect(expected)}, not ${inspect(actual)}`
  nodeAssert.deepStrictEqual(actual, expected, message)
}
