'use strict'

const R = require('ramda')
const { invoker } = R
const { getDefaultPredicate } = require('./predicate')
const { getDefaultMessage } = require('./message')
const { Validation, Success, Fail } = require('monet')
const { AssertionError } = require('assert')
const flipValidation = invoker(2, 'cata')(Validation.success, Validation.fail)

const assert = plan => {
  const { expected, actual } = plan

  const predicate = getDefaultPredicate(plan)
  const message = getDefaultMessage(plan)

  const result = expected
    ? predicate(expected, actual)
    : predicate(actual)

  if (result === true) {
    return Success(Object.assign({}, plan, {
      message,
      result
    }))
  } else {
    return Fail(Object.assign({}, plan, {
      message,
      result: new AssertionError({
        actual, expected, message
      })
    }))
  }
}

assert.fails = R.pipe(assert, flipValidation)
assert.ignore = assert

assert.comment = comment => Success({
  note: true,
  message: comment
})

module.exports = { assert }
