'use strict'

const test = require('../node-assert')
const compose = require('./compose')

test('compose applies right to left', t => {
  const f = x => x + 1
  const g = x => 2 * x
  const actual = compose(f, g)(3)
  t.notEqual(actual, 8, `(2 * 3) + 1 != 8`)
  t.equal(actual, 7, `(2 * 3) + 1 == 7`)
})
