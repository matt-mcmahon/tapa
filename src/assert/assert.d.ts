export declare interface Status {
  pass: number
  fail: number
  total: number
}

import { Invariant } from "../invariant"

/**
 * ```
 * assert :: invariant -> status
 * ```
 * -----------------------------------------------------------------------------
 *
 * The __assert__ function takes an _invariant_ and returns a _status_ object
 * representing the result of testing the invariant.
 *
 */
export declare function assert<T>(
  block: Invariant<T>
): Status
