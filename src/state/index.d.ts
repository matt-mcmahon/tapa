import { Invariant } from "../invariant"

export declare class State {
  constructor(
    invariants: Invariant<any>[],
    history: State[]
  )
  passing: number
  failing: number
  total: number
  invariants: Invariant<any>[]
  history: State[]
  promise: Promise<State>
  update: (...invariants: Invariant<any>[]) => State
  static of: State
}

/**
 * ```
 * state :: invariant => state
 * ```
 * -----------------------------------------------------------------------------
 *
 * __state__ takes an invariant and returns a new state/state object for it.
 *
 */
export declare function state(
  ...invariants: (Invariant<any> | Promise<any>)[]
): State
