import { identity } from "@mwm/functional"

import { captureStack } from "../stack"
import { invariant } from "../invariant"

const assert = block =>
  Promise.resolve(block)
    .then(block => ({
      ...block,
      caller: assert,
    }))
    .then(invariant)
    .catch(identity)

export { assert }
