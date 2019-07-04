import { isPassing, isFailing } from "../status"

const reducer = (state, invariant) => {
  const {
    pending: n,
    passing: p,
    failing: f,
    total: t,
    invariants: is,
  } = state
  return {
    pending: n + (invariant instanceof Promise ? 1 : 0),
    passing: p + (isPassing(invariant) ? 1 : 0),
    failing: f + (isFailing(invariant) ? 1 : 0),
    total: t + 1,
    invariants: [...is, invariant],
  }
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

  static compare({ value: a }, { value: b }) {
    return a > b ? 1 : a < b ? -1 : 0
  }
  static of = state
}
