import test from "../node-assert/index.js"
import { equals, F, T } from "@mwm/functional"
import { invariant } from "./invariant.js"

test(
  import.meta.url,
  t => {
    const i = invariant({
      predicate: T,
    })
    const actual = i.run().isSuccess()
    const message = `should pass, predicate returns true`
    t.ok(actual, message)
  },
  t => {
    const i = invariant({
      predicate: F,
    })
    const actual = i.run().isFail()
    const message = `should fail, predicate returns false`
    t.ok(actual, message)
  },
  t => {
    const i = invariant({
      actual: "something",
    })
    const actual = i.run().isSuccess()
    const message = `should pass, "something" is something`
    t.ok(actual, message)
  },
  t => {
    const i = invariant({
      actual: [],
    })
    const actual = i.run().isFail()
    const message = `should fail, empty array is nothing`
    t.ok(actual, message)
  },
  t => {
    const i = invariant({
      actual: "",
    })
    const actual = i.run().isFail()
    const message = `should fail, empty string is nothing`
    t.ok(actual, message)
  },
  t => {
    const i = invariant({
      expected: 1,
      actual: 1,
    })
    const actual = i.run().isSuccess()
    const message = `should pass, 1 === 1 using implied predicate`
    t.ok(actual, message)
  },
  t => {
    const i = invariant({
      predicate: equals,
      expected: 1,
      actual: 1,
    })
    const actual = i.run().isSuccess()
    const message = `should pass, 1 === 1 using explicit predicate`
    t.ok(actual, message)
  },
  t => {
    const i = invariant({
      expected: 2,
      actual: 1,
    })
    const actual = i.run().isFail()
    const message = `should fail, 1 === 2 using implied predicate`
    t.ok(actual, message)
  },
  t => {
    const i = invariant({
      predicate: equals,
      expected: 2,
      actual: 1,
    })
    const actual = i.run().isFail()
    const message = `should fail, 1 === 2 using explicit predicate`
    t.ok(actual, message)
  }
)
