const { watcher } = require('./test-runner')

const tests = watcher(`./src/**/*.test.js`)

tests.run()
