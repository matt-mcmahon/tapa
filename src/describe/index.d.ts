import { Assert, Assertion } from "../assert"
import { State } from "../state"

export declare interface Plan {
  <T>(assert: Assert<T>): Promise<Assertion<T>>
}

export function describe(
  description: String,
  plan: Function
): Promise<Assertion<any>>
