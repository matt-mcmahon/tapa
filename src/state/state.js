import { isPending, isPassing, isFailing } from "../status"

const reducer = (summary, assertion) => {
  summary.pending += isPending(assertion) ? 1 : 0
  summary.passing += isPassing(assertion) ? 1 : 0
  summary.failing += isFailing(assertion) ? 1 : 0
  summary.total += 1
  return summary
}

const accumulator = () => ({
  pending: 0,
  passing: 0,
  failing: 0,
  total: 0,
})

export const state = (name, ...assertions) => {
  return new State({ name, assertions })
}

class State {
  constructor({ name, assertions, history = [] }) {
    this.name
    this.history = Object.freeze(history)
    this.assertions = Object.freeze(assertions)
    Object.freeze(this)
  }

  get length() {
    return this.history.length
  }

  get summary() {
    return this.assertions.reduce(reducer, accumulator())
  }

  add(...assertions) {
    return new State({
      name: this.name,
      assertions: [...this.assertions, ...assertions],
      history: [...this.history, this],
    })
  }

  get promise() {
    return Promise.all(this.assertions).then(
      assertions =>
        new State({
          assertions,
          name: this.name,
          history: [...this.history, this],
        })
    )
  }

  static of = state
}
