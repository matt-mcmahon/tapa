import { strict as assert } from "assert"

const maxLength = 80
const leftPad = 10

const pad = (char = "-", length = maxLength) =>
  `${"".padEnd(length, char)}`

const captureStack = ref => {
  const cwd = process.cwd()
  const e = {}
  Error.captureStackTrace(e, ref)
  return e.stack
    .split("\n")
    .map(
      s => `${pad(" ", leftPad)}${s.trim()}` //.slice(0, maxLength)
    )
    .join("\n")
}

const pass = (status, message) => {
  status.pass++
  console.log(`     ok : ${message}`)
}

const fail = (status, err) => {
  status.total++
  status.fail++
  console.log(
    ` not ok : ${err.message} ${err.code}\n${captureStack(
      describe
    )}`
  )
}

const makeAssert = status => ({
  given,
  should,
  actual,
  expected,
}) => {
  const message = `given ${given}; should ${should}`
  try {
    assert.deepStrictEqual(actual, expected, message)
    pass(status, message)
  } catch (err) {
    fail(status, err)
  }
}

const describe = (description, plan) => {
  console.log(`${pad("=")}\n${description}\n${pad("-")}\n`)
  const status = { total: 0, pass: 0, fail: 0 }
  const assert = makeAssert(status)
  assert.pass = message => pass(status, message)
  assert.fail = message => fail(status, Error(message))

  plan(assert)
  console.log(
    `\n${pad()}\nTotal ${status.total}     Pass ${
      status.pass
    }     Fail ${status.fail}\n${pad("=")}\n`
  )
}

export { describe }
