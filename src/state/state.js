import { isPassing, isFailing } from "../status"

const reducer = (a, invariant) => {
  a.pending += invariant instanceof Promise ? 1 : 0
  a.passing += isPassing(invariant) ? 1 : 0
  a.failing += isFailing(invariant) ? 1 : 0
  a.total += 1
  a.invariants.push(invariant)
  return a
}

const accumulator = () => ({
  pending: 0,
  passing: 0,
  failing: 0,
  total: 0,
  invariants: [],
})

export const state = (...invariants) =>
  new State(...invariants)

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
