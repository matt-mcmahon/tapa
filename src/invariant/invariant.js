'use strict'

const { Success, Fail } = require('monet')
const { AssertionError } = require('assert')

const { getDefaultPredicate } = require('./predicate')
const getDefaultMessage = require('./message')

const invariantFrom = {
  'object' (block) {
    const run = () => {
      const {
        expected,
        actual,
        predicate,
        message
      } = i

      const result = expected
        ? predicate(expected, actual)
        : predicate(actual)

      if (result === true) {
        return Success(Object.assign({}, block, {
          message,
          result
        }))
      } else {
        return Fail(Object.assign({}, block, {
          message,
          result: new AssertionError({
            actual, expected, message
          })
        }))
      }
    }

    const i = Object.assign({}, block, {
      message: getDefaultMessage(block),
      predicate: getDefaultPredicate(block),
      run: run
    })

    return i.run()
  },
  'string' (comment) {
    return Success(Object.assign({}, {
      message: comment,
      result: true
    }))
  },
  'function' (predicate) {
    Success(Object.assign({}, {
      message: `Invariant(${predicate.name})`,
      result: predicate()
    }))
  }
}

const Invariant = description => {
  const i = invariantFrom[typeof description](description)
  return Object.defineProperties(i, {
    constructor: {
      value: Invariant
    }
  })
}

Object.defineProperties(Invariant, {
  of: {
    value: description => Invariant(description)
  }
})

module.exports = Invariant
