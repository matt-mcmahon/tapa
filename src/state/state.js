import { isPending, isPassing, isFailing } from "../status"

const reducer = (state, invariant) => {
  state.pending += isPending(invariant) ? 1 : 0
  state.passing += isPassing(invariant) ? 1 : 0
  state.failing += isFailing(invariant) ? 1 : 0
  state.total += 1
  state.invariants.push(invariant)
  return state
}

const accumulator = () => ({
  pending: 0,
  passing: 0,
  failing: 0,
  total: 0,
  invariants: [],
})

export const state = (...invariants) => {
  return new State(...invariants)
}

export class State {
  constructor(...invariants) {
    const state = invariants.reduce(reducer, accumulator())
    for (const key in state) {
      this[key] = state[key]
    }
  }

  static of = state
}
