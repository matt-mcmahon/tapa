import { Invariant } from "../invariant"

export declare interface Status<T> {
  passing: number
  failing: number
  total: number
  invariants: [Invariant<T>]
}
/**
 * ```
 * status :: invariant => status
 * ```
 * -----------------------------------------------------------------------------
 *
 * __status__ takes an invariant and returns a new status/state object for it.
 *
 */
export declare function status<T>(
  invariant: Invariant<T>
): Status<[T]>
