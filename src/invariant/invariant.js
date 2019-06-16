import deepEqual from "deep-equal"

export const invariant = ({
  given,
  should,
  actual,
  expected,
  ...rest
}) => {
  const i = {
    ...rest,
    given,
    should,
    actual,
    expected,
    get result() {
      return deepEqual(actual, expected)
    },
    message: `given ${given}; should ${should}`,
  }
  Object.defineProperty(i, "of", { value: invariant })
  return Object.freeze(i)
}
