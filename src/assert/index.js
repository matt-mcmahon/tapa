const R = require('ramda')
const { IO, Validation, Success, Fail } = require('monet') //eslint-disable-line
const { AssertionError } = require('assert')

/**
 * @typedef {object} Assertion
 *
 * @property {function} predicate
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
 * @param {Assertion} assertion
 * @return {Validation}
 */
const assert = assertion => {
  const {
    predicate,
    expected,
    actual
  } = assertion

  if (typeof predicate !== 'function') {
    const message = `assertion requires a predicate of type function`
    return Fail(Object.assign({}, assertion, {
      message,
      result: new TypeError(message)
    }))
  }

  const result = expected
    ? predicate(expected, actual)
    : predicate(actual)

  const message = R.has('message', assertion)
    ? assertion.message
    : `Assert(Expected(${expected}), Actual(${actual}))`

  if (result === true) {
    return Success(Object.assign({}, assertion, {
      message,
      result
    }))
  } else {
    return Fail(Object.assign({}, assertion, {
      message,
      result: new AssertionError({
        actual, expected, message
      })
    }))
  }
}

module.exports = { assert }
