import { isPending, isPassing, isFailing } from "../status"
import { identity } from "@mwm/functional"

const reducer = (state, invariant) => {
  state.pending += isPending(invariant) ? 1 : 0
  state.passing += isPassing(invariant) ? 1 : 0
  state.failing += isFailing(invariant) ? 1 : 0
  state.total += 1
  return state
}

const accumulator = (invariants, history) => ({
  pending: 0,
  passing: 0,
  failing: 0,
  total: 0,
  invariants,
  history,
})

export const state = (...invariants) => {
  return new State(invariants)
}

class State {
  constructor(invariants, history = []) {
    const temp = invariants.reduce(
      reducer,
      accumulator(invariants, history)
    )
    for (const key in temp) {
      this[key] = temp[key]
    }
  }

  update(...invariants) {
    return new State(
      [this.invariants, ...invariants],
      [...this.history, this]
    )
  }

  get promise() {
    return Promise.all(this.invariants).then(is => {
      return new State(is, [...this.history, this])
    })
  }

  static of = state
}
