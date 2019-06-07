import deepEqual from "deep-equal"

const invariant = ({
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
    result: deepEqual(actual, expected),
    message: `given ${given}; should ${should}`,
    of: invariant,
  }
}

export { invariant, invariant as default }
