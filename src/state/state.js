import { isPending, isPassing, isFailing } from "../status"
import { identity } from "@mwm/functional"

const reducer = (state, invariant) => {
  state.pending += isPending(invariant) ? 1 : 0
  state.passing += isPassing(invariant) ? 1 : 0
  state.failing += isFailing(invariant) ? 1 : 0
  state.total += 1
  return state
}

const accumulator = () => ({
  pending: 0,
  passing: 0,
  failing: 0,
  total: 0,
})

export const state = (...invariants) => {
  return new State(invariants)
}

const addTo = (target, name) => (method, as, body) => {
  const hash = `${name}#${method}`
  Object.defineProperty(body, "name", { value: hash })
  Object.defineProperty(target, method, { [as]: body })
}

class State {
  constructor(invariants, history = []) {
    const state = invariants.reduce(reducer, accumulator())
    const add = addTo(state, "State")

    add("update", "value", () => {
      return new State(invariants, [...history, state])
    })

    add("promise", "get", () => {
      const p = Promise.all(invariants)
        .then(is => {
          return new State(is, [...history, state])
        })
        .catch(identity)
      return p
    })

    return state
  }

  static of = state
}
