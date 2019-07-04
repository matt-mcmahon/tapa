import { identity } from "@mwm/functional"

import { captureStack } from "../stack"
import { invariant } from "../invariant"
import { state } from "../state"

const assert = block =>
  Promise.resolve(block)
    .then(block => ({
      ...block,
      captureStack: () => captureStack(assert),
    }))
    .then(invariant)
    .then(state)
    .catch(identity)

export { assert }
