import { Invariant } from "../invariant"

export declare interface Status {
  pass: number
  fail: number
  total: number
}

/**
 * __`assert :: invariant -> status`__
 *
 * The `assert` function takes an __invariant__ and returns a __status__ object
 * representing the result of testing the invariant.
 */
export declare function assert(
  invariant: Invariant<any>
): Status
