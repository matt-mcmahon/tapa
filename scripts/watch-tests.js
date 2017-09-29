'use strict'

const { watcher } = require('../src/test-runner')

const tests = watcher(`./src/**/*.test.js`)

tests.run()
