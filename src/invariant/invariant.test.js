'use strict'

const assert = require('assert')
const R = require('ramda')
const { equals, F, T } = R

const invariant = require('./invariant')

{
  const i = invariant({ predicate: T })
  const actual = i.isSuccess()
  const message = `should pass, predicate returns true`
  assert.ok(actual, message)
}

{
  const i = invariant({ predicate: F })
  const actual = i.isFail()
  const message = `should fail, predicate returns false`
  assert.ok(actual, message)
}

{
  const i = invariant({ actual: 'something' })
  const actual = i.isSuccess()
  const message = `should pass, "something" is something`
  assert.ok(actual, message)
}

{
  const i = invariant({ actual: [] })
  const actual = i.isFail()
  const message = `should fail, empty array is nothing`
  assert.ok(actual, message)
}

{
  const i = invariant({ actual: '' })
  const actual = i.isFail()
  const message = `should fail, empty string is nothing`
  assert.ok(actual, message)
}

{
  const i = invariant({
    expected: 1,
    actual: 1
  })
  const actual = i.isSuccess()
  const message = `should pass, 1 === 1 using implied predicate`
  assert.ok(actual, message)
}

{
  const i = invariant({
    predicate: equals,
    expected: 1,
    actual: 1
  })
  const actual = i.isSuccess()
  const message = `should pass, 1 === 1 using explicit predicate`
  assert.ok(actual, message)
}

{
  const i = invariant({
    expected: 2,
    actual: 1
  })
  const actual = i.isFail()
  const message = `should fail, 1 === 2 using implied predicate`
  assert.ok(actual, message)
}

{
  const i = invariant({
    predicate: equals,
    expected: 2,
    actual: 1
  })
  const actual = i.isFail()
  const message = `should fail, 1 === 2 using explicit predicate`
  assert.ok(actual, message)
}
