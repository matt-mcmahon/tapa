import {
  assoc,
  bind,
  clone,
  pipe,
  tap,
} from "@mwm/functional"

import { invariant } from "../invariant/index.js"

const assocStack = constructor => obj => {
  const stack = clone(obj)
  Error.captureStackTrace(stack, constructor)
  Object.defineProperty(stack, "stack", {
    enumerable: true,
  })
  return invariant(stack)
}

import processArgument from "./process-argument.js"

const Assert = plan => {
  const append = tap(bind(plan.push, plan))

  const assert = invariantOptions => {
    return pipe(
      processArgument,
      assocStack(assert),
      append
    )(invariantOptions)
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

  Object.defineProperties(assert, {
    constructor: {
      value: Assert,
    },
  })

  return assert
}

Assert.of = plan => Assert(plan)

export default Assert
