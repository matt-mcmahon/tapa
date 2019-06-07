export interface Invariant<T> {
  given: string
  should: string
  actual: T
  expected: T
}

export interface Iterator<T> {
  done: boolean
  next(): T | undefined
}

export interface State {
  description: string
  total: number
  pass: number
  fail: number
  invariants: Invariant<any>[]
  /**
   * returns the current __State__
   */
  valueOf(): State
  [Symbol.iterator]: Iterator<State>
}

export interface Plan {
  (assert: Function): Promise<any>
}

export function describe(): (
  description: string,
  plan: Plan,
  state?: State
) => void
