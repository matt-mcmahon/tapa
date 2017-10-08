'use strict'

const R = require('ramda')
const { ifElse, has, both, always, defaultTo } = R

const message = ifElse(
  has('message'),
  ({ message }) => message,
  always(undefined) // needed for defaultTo
)

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

module.exports = plan => {
  const e = expected(plan)
  const c = comma(plan)
  const a = actual(plan)
  const m = defaultTo(`Assert(${e}${c}${a})`, message(plan))
  return m
}
