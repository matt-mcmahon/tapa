const R = require('ramda')
const { invoker } = R
const { getDefaultPredicate } = require('./predicate')
const { getDefaultMessage } = require('./message')
const { IO, Validation, Success, Fail } = require('monet') //eslint-disable-line
const { AssertionError } = require('assert')
const flipValidation = invoker(2, 'cata')(Validation.success, Validation.fail)

/**
 * @typedef {object} Plan
 *     _Plans_ an assertion test.
 *
 * @property {function} [predicate]
 *     Takes an optional _expected_ value, and then a required _actual_ value.
 *     The assertion passed if the function returns `true`.
 *     The assertion failed on any other return value.
 *
 * @property {*} actual
 *     The _actual_ value we want to assertion.
 *     Will be passed as the final parameter to _predicate_.
 *
 * @property {*} [expected]
 *     Value we're comparing the _actual_ value to.
 *     This value Will be passed as the first paramter to _predicate_ e.g. `predicate(expected, actual)`
 *
 * @property {string} [message]
 *     Message to print for assertion.
 */

/**
 * Creates an assertion based on the passed in predicate and expected value (if any).
 * @param {Plan} plan
 * @return {Validation}
 */
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
assert.comment = comment => Success({
  message: comment
})

module.exports = { assert }
