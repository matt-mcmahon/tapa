'use strict'

const R = require('ramda')
const { either, isNil, isEmpty, complement, cond, has, prop, pipe, always, T, F, equals, both } = R

const isNothing = either(isNil, isEmpty)
isNothing.toString = () => `isNothing :: A -> Boolean`

const isSomething = complement(isNothing)
isSomething.toString = () => `isSomething :: A -> Boolean`

equals.toString = () => `equals :: A, B -> Boolean`

module.exports = {
  getDefaultPredicate: cond([
    [has('predicate'), prop('predicate')],
    [pipe(both(prop('expected'), prop('actual'))), always(equals)],
    [has('actual'), always(isSomething)],
    [has('message'), always(T)],
    [T, always(F)]
  ]),
  equals,
  isSomething,
  T,
  F
}
