'use strict'

const { assoc, clone } = require('ramda')

const { invariant } = require('../invariant')

const assocStack = (constructor, obj) => {
  const stack = clone(obj)
  Error.captureStackTrace(stack, constructor)
  return invariant(stack)
}

const Assert = plan => {
  const append = value => plan.push(value)

  const assert = invariantOptions => {
    append(assocStack(assert, invariantOptions))
  }

  const fails = invariantOptions => {
    append(assocStack(fails, assoc('fails', true, invariantOptions)))
  }

  const ignore = invariantOptions => {
    append(assocStack(ignore, assoc('ignore', true, invariantOptions)))
  }

  const comment = message => append(assocStack(comment, {
    message: message,
    predicate: () => true
  }))

  assert.fails = fails
  assert.ignore = ignore
  assert.comment = comment

  Object.defineProperties(assert, {
    constructor: {
      value: Assert
    }
  })

  return assert
}

Assert.of = plan => Assert(plan)

module.exports = Assert
