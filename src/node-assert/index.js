const assert = require('assert').strict

const pass = '    ok: '
const fail = 'not ok: '

const test = (message, block) => {
  try {
    block(assert)
    console.log(pass, message)
  } catch (err) {
    console.log('\n', fail, message, err, '\n')
    throw err
  }
}

module.exports = test
