'use strict'

const R = require('ramda')
const { either, isNil, isEmpty, complement, cond, has, prop, pipe, always, T, equals } = R

const isNothing = either(isNil, isEmpty)
isNothing.toString = () => `isNothing :: A -> Boolean`

const isSomething = complement(isNothing)
isSomething.toString = () => `isSomething :: A -> Boolean`

equals.toString = () => `equals :: A, B -> Boolean`

module.exports = {
  getDefaultPredicate: cond([
    [has('predicate'), prop('predicate')],
    [pipe(prop('expected'), isNil), always(isSomething)],
    [T, always(equals)]
  ]),
  equals,
  isSomething
}
