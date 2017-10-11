'use strict'

const { Success, Fail } = require('monet')
const { ifElse, either, isNil, isEmpty, complement, has, equals } = require('ramda')

const getDefaultMessage = require('./message')

const isSomething = complement(either(isNil, isEmpty))

const testInvariant = o => {
  const p = has('predicate', o)
  const e = has('expected', o)
  const a = has('actual', o)

  /* eslint-disable space-in-parens, no-multi-spaces */
  if ( p && a && e ) return o.predicate(o.expected, o.actual)
  if ( p && a      ) return o.predicate(o.actual)
  if ( p           ) return o.predicate()
  if (      a && e ) return equals(o.expected, o.actual)
  if (      a      ) return isSomething(o.actual)
  else throw new Error(`Invariant must have at least one of: predicate, actual`)
  /* eslint-enable no-multi-spaces */
}

const runInvariant = ifElse(
  testInvariant,
  Success,
  Fail
)

const Invariant = description => {
  const i = Object.assign({}, description, {
    message: getDefaultMessage(description),
    run: () => runInvariant(description)
  })

  Object.defineProperties(i, {
    constructor: {
      value: Invariant
    }
  })
  return i.run()
}

Object.defineProperties(Invariant, {
  of: {
    value: description => Invariant(description)
  }
})

module.exports = Invariant
