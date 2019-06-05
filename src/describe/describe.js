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

  invariant.result.fail === true && status.fail++
  invariant.result.pass === true && status.pass++
  status.invariants.push(invariant)

  return status
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

  update(
    Object.freeze({
      ...rest, // spread first so we overwrite
      given,
      should,
      message: `given ${given}; should ${should}`,
      actual,
      expected,
      result,
    })
  )
}

const describe = async (description, plan) => {
  const status = {
    description,
    total: 0,
    pass: 0,
    fail: 0,
    invariants: [],
  }
  const assert = makeAssert(update(status))
  assert.pass = message => pass(status, message)
  assert.fail = message => fail(status, Error(message))

  await plan(assert)

  print(status)
}

export { describe, describe as default }
