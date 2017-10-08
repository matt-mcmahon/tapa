'use strict'

const { Success, Fail } = require('monet')
const { AssertionError } = require('assert')

const { getDefaultPredicate } = require('./predicate')
const getDefaultMessage = require('./message')

const invariantFromObject = block => {
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
}

const invariantFromString = comment =>
Success(Object.assign({}, {
  message: comment,
  result: true
}))

const invariantFromFunction = predicate =>
Success(Object.assign({}, {
  message: `Invariant(${predicate.name})`,
  result: predicate()
}))

const Invariant = description => {
  switch (typeof description) {
    case 'string':
      return invariantFromString(description)
    case 'function':
      return invariantFromFunction(description)
    case 'object':
    default:
      return invariantFromObject(description)
  }
}

Object.defineProperties(Invariant, {
  constructor: {
    value: Invariant
  },
  of: {
    value: description => Invariant(description)
  }
})

module.exports = Invariant
