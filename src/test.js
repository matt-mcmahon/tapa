const { runner } = require('./test-runner')

const tests = runner(`./src/**/*.test.js`)

setTimeout(tests.run.bind(tests), 2000)
