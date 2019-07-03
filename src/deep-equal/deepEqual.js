import eee from "deep-equal"
import { curryS } from "@mwm/functional"

export const signatures = [
  "deepEqual.getExpected :: b => a => boolean",
  "deepEqual.getActual :: a => boolean",
]

const implementation = (expected, actual) => {
  return eee(actual, expected)
}

export const deepEqual = curryS(signatures, implementation)
