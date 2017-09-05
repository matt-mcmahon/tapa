'use strict'

const R = require('ramda')
const { ifElse, has, both, defaultTo, always } = R

const expected = ifElse(
  has('expected'),
  ({ expected }) => `Expected(${expected})`,
  always('')
)

const comma = ifElse(
  both(has('actual'), has('expected')),
  always(', '),
  always('')
)

const actual = ifElse(
  has('actual'),
  ({ actual }) => `Actual(${actual})`,
  always('')
)

const getDefaultMessage = plan => {
  const e = expected(plan)
  const c = comma(plan)
  const a = actual(plan)
  return defaultTo(`Assert(${e}${c}${a})`, plan.message)
}

module.exports = {
  getDefaultMessage
}
