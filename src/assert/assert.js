import {
  assoc,
  clone,
  pipe,
  tap,
  bind,
} from "@mwm/functional"

import processArgument from "./process-argument"

import { captureStack } from "../capture-stack"

const assocStack = constructor => value => ({
  ...value,
  stack: captureStack(constructor),
})

class Assert {
  constructor(plan) {
    const append = tap(bind(plan.push, plan))

    const assert = invariant => {
      return pipe(
        processArgument,
        assocStack(assert),
        invariant,
        append
      )(invariant)
    }

    const fails = invariantOptions => {
      return pipe(
        processArgument,
        assoc("fails", true),
        assocStack(fails),
        append
      )(invariantOptions)
    }

    const skip = invariantOptions => {
      return pipe(
        processArgument,
        assoc("skip", true),
        assocStack(skip),
        append
      )(invariantOptions)
    }

    const comment = message => {
      return pipe(
        processArgument,
        assoc("skip", true),
        assocStack(comment),
        append
      )({
        message: message,
      })
    }

    assert.fails = fails
    assert.skip = skip
    assert.comment = comment

    return assert
  }
}

Assert.of = plan => Assert(plan)
const assert = Assert.of

export { Assert, assert, assert as default }
