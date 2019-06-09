import deepEqual from "deep-equal"

import { captureStack } from "../capture-stack"
import { print } from "./print"

const pass = () => {
  return { pass: true }
}

const fail = () => {
  return {
    fail: true,
    stack: captureStack(describe),
  }
}

const update = status => invariant => {
  status.total++
  invariant.fail === true && status.fail++
  invariant.pass === true && status.pass++
  status.invariants.push(invariant)
}

const makeAssert = update => ({
  given,
  should,
  actual,
  expected,
  ...rest
}) => {
  const result = deepEqual(actual, expected)
    ? pass()
    : fail()

  const invariant = {
    ...rest, // spread first so we overwrite
    given,
    should,
    message: `given ${given}; should ${should}`,
    actual,
    expected,
    ...result, // result overwrites rest
  }
  update(invariant)
}

const describe = (description, plan) => {
  const status = {
    description,
    total: 0,
    pass: 0,
    fail: 0,
    invariants: [],
  }
  const updater = update(status)
  const assert = makeAssert(updater)
  assert.pass = message => updater({ message, ...pass() })
  assert.fail = message => updater({ message, ...fail() })

  const result = plan(assert)

  return Promise.resolve(result)
    .catch(err => updater({ fail: err }))
    .finally(print(status))
}

export {
  describe as default,
  describe,
  fail,
  makeAssert,
  pass,
  update,
}
