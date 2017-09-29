'use strict'

const runner = require('./test-runner')

module.exports = {
  runner: runner(false),
  watcher: runner(true)
}
