import { watcher } from "../src/test-runner"

const tests = watcher(`./src/**/*.test.js`)

tests.run()
