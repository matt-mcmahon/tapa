import { Invariant } from "../invariant"
import { Status } from "../status"

/**
 * ```
 * assert :: invariant -> state
 * ```
 * -----------------------------------------------------------------------------
 *
 * The __assert__ function takes an _invariant_ and returns a _status_ object
 * representing the result of testing the invariant.
 *
 */
export declare function assert<T>(
  what: Invariant<T> | Promise<T>
): Status
