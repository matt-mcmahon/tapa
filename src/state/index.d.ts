import { Assertion } from "../assert"

export declare class State {
  constructor(
    assertions: Assertion<any>[],
    history: State[]
  )
  passing: number
  failing: number
  total: number
  assertions: Assertion<any>[]
  history: State[]
  promise: Promise<State>
  update: (...assertions: Assertion<any>[]) => State
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
  ...assertions: (Assertion<any> | Promise<any>)[]
): State
