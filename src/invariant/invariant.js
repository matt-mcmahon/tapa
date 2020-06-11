import { Maybe, Success, Fail } from "monet"
import {
  complement,
  either,
  equals,
  has,
  isEmpty,
  isNil,
} from "@mwm/functional"

import getDefaultMessage from "./message.js"

const isSomething = complement(
  either(isNil)(isEmpty)
)

/* eslint-disable space-in-parens, no-multi-spaces */
const evaluate = o => {
  const { predicate, expected, actual } = o

  const p = has("predicate")(o)
  const e = has("expected")(o)
  const a = has("actual")(o)

  if (p && a && e)
    return predicate(expected, actual)
  if (p && a) return predicate(actual)
  if (p) return predicate()
  if (a && e) return equals(expected)(actual)
  if (a) return isSomething(actual)

  throw new Error(
    `Invariant must have at least one of: predicate, actual`
  )
}
/* eslint-enable space-in-parens, no-multi-spaces */

class Invariant {
  constructor(description) {
    Object.assign(this, description)
    this.message = getDefaultMessage(description)
  }

  run() {
    if (this.skip) {
      return Maybe.Some(this)
    } else if (this.fails) {
      return evaluate(this) !== true
        ? Success(this)
        : Fail(this)
    } else {
      return evaluate(this) === true
        ? Success(this)
        : Fail(this)
    }
  }

  static of(description) {
    return new Invariant(description)
  }

  static invariant(description) {
    return new Invariant(description)
  }
}

const invariant = description =>
  new Invariant(description)

export {
  invariant,
  Invariant,
  Invariant as default,
}
