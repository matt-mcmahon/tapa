'use strict'

const M = require('monet')
const R = require('ramda')

const getDefaultMessage = require('./message')

const isSomething = R.complement(R.either(R.isNil, R.isEmpty))

/* eslint-disable space-in-parens, no-multi-spaces */
const evaluate = o => {
  const { predicate, expected, actual } = o

  const p = R.has('predicate', o)
  const e = R.has('expected',  o)
  const a = R.has('actual',    o)

  if ( p && a && e ) return predicate(expected, actual)
  if ( p && a      ) return predicate(actual)
  if ( p           ) return predicate()
  if (      a && e ) return R.equals(expected, actual)
  if (      a      ) return isSomething(actual)

  throw new Error(`Invariant must have at least one of: predicate, actual`)
}
/* eslint-enable space-in-parens, no-multi-spaces */

class Invariant {
  constructor (description) {
    Object.assign(this, description)
    this.message = getDefaultMessage(description)
  }

  run () {
    if (this.skip) {
      return M.Maybe.Some(this)
    } else if (this.fails) {
      return evaluate(this) !== true ? M.Success(this) : M.Fail(this)
    } else {
      return evaluate(this) === true ? M.Success(this) : M.Fail(this)
    }
  }

  static of (description) {
    return new Invariant(description)
  }
}

module.exports = Invariant
