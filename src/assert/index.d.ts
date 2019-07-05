import { Status } from "../status"

export interface Assertion<T> {
  actual: T
  expected: T
  given?: string
  should?: string
  predicate?: (descriptor: {
    actual: T
    expected: T
  }) => Boolean
}

/**
 * ```
 * invariant :: a => b
 * ```
 * -----------------------------------------------------------------------------
 *
 * Configures an assertion test
 *
 * @param {Assertion} descriptor
 */
export declare function invariant<T>(
  descriptor: Assertion<T>
): Assertion<T>

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
  (block: Assertion<T>): Promise<Status>
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
  block: Assertion<T> | Promise<T>
): Promise<Status>
