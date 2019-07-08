import { isPending, isPassing, isFailing } from "../status"

const accumulator = () => ({
  pending: 0,
  passing: 0,
  failing: 0,
  length: 0,
})

const reducer = (summary, assertion) => {
  summary.pending += isPending(assertion) ? 1 : 0
  summary.passing += isPassing(assertion) ? 1 : 0
  summary.failing += isFailing(assertion) ? 1 : 0
  summary.length += 1
  return summary
}

export const state = (name, ...assertions) => {
  return new State({ name, assertions })
}

class State {
  constructor({
    name = "",
    assertions = [],
    history = [],
  } = {}) {
    this.assertions = assertions
    this.history = history
    this.name = name
    this.summary = assertions.reduce(reducer, accumulator())
    this.next = this.next.bind(this)
  }

  [Symbol.iterator]() {
    return this.history[Symbol.iterator]()
  }

  [Symbol.asyncIterator]() {
    let state = this
    return {
      next(...assertions) {
        return state
          .next(...assertions)
          .then(({ value, done }) => {
            state = value
            return { value, done }
          })
      },
    }
  }

  get done() {
    return this.summary.pending === 0
  }

  get length() {
    return this.assertions.length
  }

  async next(...assertions) {
    const done = this.done && assertions.length === 0
    return done
      ? {
          done: true,
          value: this,
        }
      : Promise.all(this.assertions).then(resolved => {
          const value = new State({
            name: this.name,
            assertions: [...resolved, ...assertions],
            history: [...this.history, this],
          })
          const done = false
          return { done, value }
        })
  }
}
