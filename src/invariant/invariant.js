import { has, equals } from "@mwm/functional"
import getDefaultMessage from "./message"

const evaluate = o => {
  const { predicate, expected, actual } = o

  const p = has("predicate", o)
  const e = has("expected", o)
  const a = has("actual", o)

  if (p && a && e) return predicate(expected, actual)
  if (p && a) return predicate(actual)
  if (p) return predicate()
  if (a && e) return equals(expected, actual)
  if (a) return isSomething(actual)

  throw new Error(`Invariant must have at least one of: predicate, actual`)
}

class Invariant {
  constructor(
    description = {
      message: undefined,
      predicate: true,
      actual: undefined,
      expected: undefined
    }
  ) {
    Object.assign(this, description)
    this.message = getDefaultMessage(description)
  }

  run() {
    if (this.skip) {
      return Maybe.Some(this)
    } else if (this.fails) {
      return evaluate(this) !== true ? Success(this) : Fail(this)
    } else {
      return evaluate(this) === true ? Success(this) : Fail(this)
    }
  }

  static of(description) {
    return new Invariant(description)
  }

  static invariant(description) {
    return new Invariant(description)
  }
}

export default Invariant
