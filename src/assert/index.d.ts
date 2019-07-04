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
export interface Assert<T> {
  (block: Invariant<T>): Promise<Status>
}

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
  block: Invariant<T> | Promise<T>
): Promise<Status>
