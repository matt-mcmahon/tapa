import { Invariant } from "../invariant"
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

export interface Assert {
  (invariant: Invariant<any>): void
}

export interface Plan<T> {
  (assert: Assert): Promise<T>
}

export function describe(
  assert: Assert
): (
  state: State
) => <T>(description: string, plan: Plan<T>) => Promise<T>
