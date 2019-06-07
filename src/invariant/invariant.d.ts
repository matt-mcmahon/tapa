export interface Invariant<T> {
  given: string
  should: string
  actual: T
  expected: T
}

export declare function invariant<T>(
  descriptor: Invariant<T>
): Invariant<T>
