'use strict'

const { fork } = require('child_process')

const tests = [
  './src/assert/assert.test.js',
  './src/assert/message.test.js',
  './src/assert/predicate.test.js',
  './src/reporter/reporter.test.js',
  './src/templates/templates.test.js'
]

tests.forEach(script => {
  fork(script, null, { stdio: true })
})
