import { strict as assert } from 'assert'

const pass = 'ok'
const fail = 'not ok'

const test = (message, ...tests) => {
  const runTest = (test, id = '') => {
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

export default test
