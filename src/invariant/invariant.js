import { has } from "@mwm/functional"
import { captureStack } from "../capture-stack"
import { inspect } from "../inspect"
import { deepEqual } from "../deep-equal"

export const Status = [
  ["pending", 0, "*"],
  ["passing", 1, "+"],
  ["failing", -1, "-"],
].reduce((o, [key, value, string]) => {
  o[key] = {
    valueOf: () => value,
    toString: () => string,
  }
  return o
}, {})

const defineProperty = (target, enumerable) => (
  key,
  from,
  defaultValue
) => {
  Object.defineProperty(target, key, {
    configureable: true,
    enumerable: enumerable,
    value: has(key, from) ? from[key] : defaultValue,
  })
}

const toString = ({ given, should, status }) => () => {
  return `[${status}] given ${given}; should ${should}`
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
  constructor(i) {
    const show = defineProperty(this, true)
    const hide = defineProperty(this, false)

    show("actual", i)
    show("expected", i, true)
    show("given", i, inspect`${this.actual}`)
    show("should", i, inspect`be ${this.expected}`)
    show("status", i, Status.pending)
    hide("predicate", i, deepEqual)
    hide("toString", {}, toString(this))
    hide("test", {}, test(this))

    Object.freeze(this)
  }

  static of(block) {
    return new Invariant(block)
  }
}

export const invariant = Invariant.of
