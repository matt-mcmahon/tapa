'use strict'

const test = require('../node-assert/index.js')
const { T } = require('@mwm/functional')
const { invariant } = require('./invariant.js')

test(
  __filename,
  async t => {
    try {
      const i = invariant({
        predicate: T
      })
      const actual = await i.evaluate()
      const message = `should pass, predicate returns true`
      t.ok(actual, message)
    } catch (er) {
      throw er
    }
  }
  // async t => {
  //   const i = invariant({
  //     predicate: F
  //   })
  //   const actual = await i.evaluate()
  //   const message = `should fail, predicate returns false`
  //   t.ok(actual, message)
  // },
  // t => {
  //   const i = invariant({
  //     actual: 'something'
  //   })
  //   const actual = i.evaluate().isSuccess()
  //   const message = `should pass, "something" is something`
  //   t.ok(actual, message)
  // },
  // t => {
  //   const i = invariant({
  //     actual: []
  //   })
  //   const actual = i.evaluate().isFail()
  //   const message = `should fail, empty array is nothing`
  //   t.ok(actual, message)
  // },
  // t => {
  //   const i = invariant({
  //     actual: ''
  //   })
  //   const actual = i.evaluate().isFail()
  //   const message = `should fail, empty string is nothing`
  //   t.ok(actual, message)
  // },
  // t => {
  //   const i = invariant({
  //     expected: 1,
  //     actual: 1
  //   })
  //   const actual = i.evaluate().isSuccess()
  //   const message = `should pass, 1 === 1 using implied predicate`
  //   t.ok(actual, message)
  // },
  // t => {
  //   const i = invariant({
  //     predicate: equals,
  //     expected: 1,
  //     actual: 1
  //   })
  //   const actual = i.evaluate().isSuccess()
  //   const message = `should pass, 1 === 1 using explicit predicate`
  //   t.ok(actual, message)
  // },
  // t => {
  //   const i = invariant({
  //     expected: 2,
  //     actual: 1
  //   })
  //   const actual = i.evaluate().isFail()
  //   const message = `should fail, 1 === 2 using implied predicate`
  //   t.ok(actual, message)
  // },
  // t => {
  //   const i = invariant({
  //     predicate: equals,
  //     expected: 2,
  //     actual: 1
  //   })
  //   const actual = i.evaluate().isFail()
  //   const message = `should fail, 1 === 2 using explicit predicate`
  //   t.ok(actual, message)
  // }
)
