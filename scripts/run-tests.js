import { runner } from "../src/runner"
import { inspect } from "../src/inspect"

runner(`./src/**/*.test.js`)
  .then(value => {
    console.log(inspect`Promise Resolved: ${value}`)
  })
  .catch(err => {
    console.log(inspect`Promise Rejected: ${err.message}`)
  })
