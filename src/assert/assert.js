import { invariant } from "../invariant"
import { captureStack } from "../capture-stack"

const assert = block => {
  const i = invariant({
    ...block,
    stack: captureStack(assert),
  })
  return i.result
    ? {
        pass: 1,
        fail: 0,
        total: 1,
        invariant: i,
      }
    : {
        pass: 0,
        fail: 1,
        total: 1,
        invariant: i,
      }
}

export { assert }
