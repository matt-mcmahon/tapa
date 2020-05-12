import { watcher } from '../src/test-runner/index.js'

const tests = watcher('./src/**/*.test.js')

tests.run()
