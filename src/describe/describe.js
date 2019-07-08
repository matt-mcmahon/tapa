import { assert } from "../assert"
import { state } from "../state"

const execute = async plan => {
  const assertions = []
  return plan(block => {
    assert(block).then(assertion =>
      assertions.push(assertion)
    )
  }).then(() => assertions)
}

export const describe = async (description, plan) => {
  return execute(plan)
    .then(assertions => state(description, ...assertions))
    .then(state => state.next())
    .catch(err => {
      console.error(`Unexpected Error in ${description}`)
      console.error(inspect`${err}`)
    })
}
