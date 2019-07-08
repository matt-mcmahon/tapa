import { Assertion } from "../assert"

export declare class State {
  constructor(options: {
    name: string
    assertions: Assertion<any>[]
    history: State[]
  })

  assertions: Assertion<any>[]
  history: State[]
  promise: Promise<State>
  summary: {
    pending: number
    passing: number
    failing: number
    total: number
  }

  add: (...assertions: Assertion<any>[]) => State
  static of: (...assertions: Assertion<any>[]) => State;
  [Symbol.iterator](): { done: boolean; value: State }
  [Symbol.asyncIterator](): Promise<{
    done: Boolean
    value: State
  }>
  done: boolean
  length: number
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
  name: string,
  ...assertions: (Assertion<any> | Promise<any>)[]
): State
