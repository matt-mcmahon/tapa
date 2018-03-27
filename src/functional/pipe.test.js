'use strict'

const test = require('../node-assert')
const pipe = require('./pipe')

test('pipe applies left to right', t => {
  const f = x => x + 1
  const g = x => 2 * x
  const actual = pipe(f, g)(3)
  t.equal(actual, 8, `2 * (3 + 1) == 8`)
  t.notEqual(actual, 7, `2 * (3 + 1) != 7`)
})
