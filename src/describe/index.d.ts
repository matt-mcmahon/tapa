import { Invariant } from "../invariant"
import { State } from "../state"
import { Assert } from "../assert"

export declare interface Plan {
  <T>(assert: Assert<T>): Promise<Invariant<T>>
}

export function describe(
  description: String,
  plan: Function
): Promise<Invariant<any>>
