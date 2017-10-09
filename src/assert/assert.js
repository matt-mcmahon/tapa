'use strict'

const R = require('ramda')
const { invoker } = R
const { Success, Fail } = require('monet')

const { Invariant } = require('../invariant')

const flipValidation = invoker(2, 'cata')(Success, Fail)

const captureStackTrace = (constructor, obj) => {
  Error.captureStackTrace(obj, constructor)
  return Invariant.of(obj)
}

const Assert = plan => {
  const append = value => plan.push(value)

  const assert = block => {
    append(captureStackTrace(assert, block))
  }

  const fails = block => {
    append(flipValidation(captureStackTrace(fails, block)))
  }

  const ignore = block => {
    append(captureStackTrace(ignore, R.assoc('ignore', true, block)))
  }

  const comment = message => append(captureStackTrace(comment, {
    message: message
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
