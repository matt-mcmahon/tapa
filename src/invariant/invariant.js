import deepEqual from "deep-equal"

const invariant = ({
  given,
  should,
  actual,
  expected,
  ...rest
}) =>
  Object.freeze({
    ...rest,
    given,
    should,
    actual,
    expected,
    get result() {
      return deepEqual(actual, expected)
    },
    message: `given ${given}; should ${should}`,
    of: invariant,
  })

export { invariant, invariant as default }
