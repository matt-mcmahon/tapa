import { Invariant } from "../invariant"

export declare interface State<T> {
  passing: number
  failing: number
  total: number
  invariants: Invariant<T>[]
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
  invariants: [Invariant<any> | Promise<any>]
): State<Invariant<any>[]>
