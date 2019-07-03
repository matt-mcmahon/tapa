export interface Invariant<T> {
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
 * @param {Invariant} descriptor
 */
export declare function invariant<T>(
  descriptor: Invariant<T>
): Invariant<T>

export enum Status {
  passing,
  failing,
  pending,
}
