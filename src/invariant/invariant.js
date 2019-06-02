const evaluate = async ({ expected, actual, predicate }) =>
  predicate(expected)(await actual)

class Invariant {
  constructor(
    descriptor = {
      expected: undefined,
      actual: undefined,
      predicate: expected => async actual =>
        expected === actual,
      get message() {
        return `${descriptor.expected} === ${
          descriptor.actual
        } ? ${descriptor.result}`
      },
      skip: false,
    }
  ) {
    Object.assign(this, descriptor)
  }

  async evaluate() {
    if (this.skip) {
      this.result = "skipped"
    } else {
      this.result = await evaluate(this)
    }
    return this
  }

  static of(...descriptors) {
    return new Invariant(Object.assign({}, ...descriptors))
  }
}

export const invariant = Invariant.of

export { Invariant, Invariant as default }
