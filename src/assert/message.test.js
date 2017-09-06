const { getDefaultMessage } = require('./message')
const { assert } = require('.')
const reporter = require('../reporter')

const tests = []

{
  const plan = {
    expected: 1,
    actual: 1
  }

  tests.push(assert({
    message: `should return the default message`,
    expected: 'Assert(Expected(1), Actual(1))',
    actual: getDefaultMessage(plan)
  }))
}

reporter(tests)
