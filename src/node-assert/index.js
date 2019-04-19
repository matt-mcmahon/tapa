const assert = require('assert').strict

const pass = 'ok'
const fail = 'not ok'

const test = (message, ...tests) => {
  const runTest = async (test, id = ``) => {
    try {
      test(assert)
      console.log(`${id.padStart(4)}: ${pass}`)
    } catch (err) {
      console.log(`${id.padStart(4)}: ${fail}`)
      throw err
    }
  }
  console.log(message)
  tests.map((f, i) => runTest(f, `${i}`))
}

module.exports = test
