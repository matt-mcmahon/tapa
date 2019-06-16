export interface Invariant<T> {
  given: string
  should: string
  actual: T
  expected: T
}

export interface Invariant<T> {
  message: string
  actual: T
  expected: T
}

/**
 * __invariant__
 *
 * Configures an assertion test
 *
 * @param {Invariant} descriptor
 */
export declare function invariant<T>(
  descriptor: Invariant<T>
): Invariant<T>
