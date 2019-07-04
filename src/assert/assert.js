import { identity } from "@mwm/functional"

import { invariant } from "../invariant"

const assert = block =>
  Promise.resolve(block)
    .then(block => ({
      ...block,
      caller: assert,
    }))
    .then(invariant)

export { assert }
