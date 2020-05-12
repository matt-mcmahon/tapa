import { runner } from '../src/test-runner/index.js'

const tests = runner('./src/**/*.test.js')

setTimeout(tests.run.bind(tests), 2000)
