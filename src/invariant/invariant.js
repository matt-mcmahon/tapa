import { has } from "@mwm/functional"
import { deepEqual } from "../deep-equal"
import { inspect } from "../inspect"
import { passing, failing } from "../status"

const copy = ({ from, to, opts }) => (
  key,
  defaultValue
) => {
  const value = has(key, from) ? from[key] : defaultValue
  Object.defineProperty(to, key, {
    ...opts,
    value,
  })
}

export const invariant = block => new Invariant(block)

export class Invariant {
  constructor(block) {
    const { actual, captureStack } = block

    const show = copy({
      from: block,
      to: this,
      opts: { enumerable: true },
    })

    this.actual = actual

    show("expected", true)
    show("given", inspect`${this.actual}`)
    show("should", inspect`be ${this.expected}`)

    if (deepEqual(this.expected)(this.actual) === true) {
      this.status = passing
    } else {
      this.stack = captureStack()
      this.status = failing
    }

    Object.freeze(this)
  }

  toString() {
    const { status, given, should } = this
    return `${status} given ${given}; should ${should}`
  }

  static of = invariant

  static is(invariant) {
    invariant instanceof Invariant
  }
}
