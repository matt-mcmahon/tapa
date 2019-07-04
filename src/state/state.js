import { isPending, isPassing, isFailing } from "../status"
import { pipeV } from "@mwm/functional"

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

const copy = (source, target) => {
  return Object.entries(source).forEach(([key, value]) => {
    target[key] = value
  })
}

export const state = (...invariants) => {
  return new State(invariants)
}

const hide = (target, key) => {
  Object.defineProperty(target, key, {
    enumerable: false,
  })
}

const update = state => (...invariants) =>
  new State(
    [...state.invariants, ...invariants],
    [...state.history, state]
  )

class State {
  constructor(invariants, history = []) {
    const state = invariants.reduce(
      reducer,
      accumulator(invariants, history)
    )
    copy(state, this)
    this.update = update(state)
    hide(this, "update")
  }

  get promise() {
    return Promise.all(this.invariants).then(
      invariants =>
        new State(invariants, [...this.history, this])
    )
  }

  static of = state
}
