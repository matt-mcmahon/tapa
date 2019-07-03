import { has } from "@mwm/functional"
import { captureStack } from "../capture-stack"
import { inspect } from "../inspect"
import { deepEqual } from "../deep-equal"

export const Status = [
  ["pending", "[_]", 0],
  ["passing", "[+]", 1],
  ["failing", "[-]", -1],
].reduce((o, [key, symbol, value]) => {
  o[key] = Object.defineProperties(
    {},
    {
      value: { value: key },
      toString: { value: () => symbol },
      valueOf: { value: () => value },
    }
  )
  return o
}, {})

const defineProperty = (from, target, opts) => (
  key,
  defaultValue
) => {
  const value = has(key, from) ? from[key] : defaultValue
  Object.defineProperty(target, key, {
    ...opts,
    value,
  })
}

const toString = ({ given, should, status }) => () => {
  return `${status} given ${given}; should ${should}`
}

const test = ({
  actual,
  expected,
  predicate,
  ...rest
}) => async caller => {
  const result = await predicate(expected)(actual)
  return Invariant.of({
    ...rest,
    expected,
    actual,
    status: result ? Status.passing : Status.failing,
    stack: result ? "" : captureStack(caller),
  })
}

export class Invariant {
  constructor(block) {
    const show = defineProperty(block, this, {
      enumerable: true,
    })
    const hide = defineProperty(block, this, {
      enumerable: false,
    })

    show("actual")
    show("expected", true)
    show("given", inspect`${this.actual}`)
    show("should", inspect`be ${this.expected}`)
    show("status", Status.pending)
    show("stack")
    hide("predicate", deepEqual)
    hide("toString", toString(this))
    hide("test", test(this))

    Object.freeze(this)
  }

  static of(block) {
    return new Invariant(block)
  }
}

export const invariant = Invariant.of
