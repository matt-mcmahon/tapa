import {
  always,
  both,
  defaultTo,
  has,
  ifElse,
} from "@mwm/functional"

import { flow } from "fp-ts/es6/function"

const message = ifElse
  (has("message"))
  (({ message }) => message)
  (always(undefined)) // needed for defaultTo

const expected = ifElse(has("expected"))(
  ({ expected }) => `Expected(${expected})`
)(always(""))

const comma = ifElse
  (both
    (has("actual"))
    (has("expected")
  ))
  (always(", "))
  (always(""))

const actual = ifElse(has("actual"))(
  ({ actual }) => `Actual(${actual})`
)(always(""))

export default plan => {
  const e = expected(plan)
  const c = comma(plan)
  const a = actual(plan)
  const m = defaultTo(`Assert(${e}${c}${a})`)(
    message(plan)
  )
  return m
}
