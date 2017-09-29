'use strict'

const R = require('ramda')
const { invoker } = R
const { getDefaultPredicate } = require('./predicate')
const { getDefaultMessage } = require('./message')
const { Validation, Success, Fail } = require('monet')
const { AssertionError } = require('assert')
const flipValidation = invoker(2, 'cata')(Validation.success, Validation.fail)

/**
 * @typedef  {function}    Predicate   - A function that returns true if it's
 *                                       arguments the given satisfy the
 *                                       predicate.
 * @param    {*}          [expected]   - A value that configures the predicate.
 * @param    {*}           actual      - The value that must satisfy the
 *                                       predicate.
 * @returns  {boolean}                 - `true` if the predicate is satisfied.
 */

/**
 * @typedef  {Object}      Plan        - An object who's properties describe an
 *                                       invariant we want to test.
 * @property {string}     [message]    - description of plan
 * @property {Predicate}  [predicate]  - invariant to test
 * @property {*}          [expected]   - value that sets the expectation for
 *                                       the predicate (if any)
 * @property {*}           actual      - value that must satisfy our invariant
 * @property {boolean}    [verbose]    - always print any generated `Error`s
 * @property {boolean}    [ignore]     - if true, this invariant won't be
 *                                       included in pass/fail metrics
 */

/**
 * Creates an invariant assertion based on the given plan.
 *
 * @param {Plan} plan
 * @returns {Validation}
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

/**
 * Creates a plan that will be executed,
 * but who's results will be ignored by the reporter.
 *
 * @param {Plan} plan
 * @returns {Validation}
 */
assert.ignore = R.pipe(R.assoc('ignore', true), assert)

assert.comment = comment => Success({
  note: true,
  message: comment
})

module.exports = assert
