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

export const state = (label, ...assertions) => {
  return new State({ label, assertions })
}

class State {
  constructor({
    label = "",
    assertions = [],
    done = false,
    history = [],
  } = {}) {
    this.assertions = assertions
    this.done = done
    this.history = history
    this.label = label
    this.summary = assertions.reduce(reducer, accumulator())
  }

  [Symbol.iterator]() {
    return this.history[Symbol.iterator]()
  }

  [Symbol.asyncIterator]() {
    return this
  }

  get length() {
    return this.assertions.length
  }

  next(...assertions) {
    const promiseWhenDone = () =>
      Promise.resolve({
        done: true,
        value: undefined,
      })

    const promiseWhenResolved = () =>
      Promise.all(this.assertions).then(assertions => ({
        done: false,
        value: new State({
          label: this.label,
          assertions: assertions,
          done: true,
          history: [...this.history, this],
        }),
      }))

    const promiseWhenMore = () =>
      Promise.resolve({
        done: false,
        value: new State({
          label: this.label,
          assertions: [...this.assertions, ...assertions],
          history: [...this.history, this],
          done: false,
        }),
      })

    return this.done
      ? promiseWhenDone()
      : assertions.length === 0
      ? promiseWhenResolved()
      : promiseWhenMore()
  }
}
