import { has } from "@mwm/functional"
import { deepEqual } from "../deep-equal"
import { inspect } from "../inspect"
import { captureStack } from "../stack"
import { failing, passing } from "../status"

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

export const assert = block => {
  return Promise.resolve(block).then(block => {
    return new Assertion(block)
  })
}

export class Assertion {
  constructor(block) {
    const { actual } = block

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
      this.stack = captureStack() //!?
      this.status = failing
    }

    Object.freeze(this)
  }

  toString() {
    const { status, given, should } = this
    return `${status} given ${given}; should ${should}`
  }

  static of(block) {
    return new Assertion(block)
  }

  static is(assertion) {
    assertion instanceof Assertion
  }
}
