import {
  pipe,
  trim,
  last,
  slice,
  map,
  blackbird,
  head,
} from "@mwm/functional"

import { inspect } from "util"

export const printLine = (char = "─", length = 80) =>
  `${"".padEnd(length, char)}`

export const header = ({ description }) => [
  "",
  "",
  printLine("━"),
  description,
  printLine(),
  "",
]

export const footer = ({ total, pass, fail }) => [
  "",
  printLine(),
  `Total ${total}     Pass ${pass}     Fail ${fail}`,
  printLine("━"),
  "",
  "",
]

const ifFail = (failMessage, leftPadding) => ({
  message,
  stack,
  actual,
  expected,
}) => {
  const width = 8

  const prepend = pre => post => "" + pre + post
  const append = post => pre => "" + pre + post

  const i = v =>
    inspect(v, {
      colors: true,
      depth: 2,
      breakLength: 80 - width,
    })

  const start = pipe(
    head,
    trim,
    prepend(failMessage),
    append(`: ${message}`),
    s => [
      "",
      s,
      leftPadding + "│",
      leftPadding + `├╴ actual: ${i(actual)}`,
      leftPadding + "│",
      leftPadding + `├╴ expected: ${i(expected)}`,
      leftPadding + "│",
      leftPadding + `├╴ stack:`,
    ]
  )

  const middle = pipe(
    slice(1)(-1),
    map(
      pipe(
        trim,
        prepend(leftPadding + "├────╴ ")
      )
    )
  )

  const end = pipe(
    last,
    trim,
    prepend(leftPadding + "└────╴ "),
    v => [v, ""]
  )

  const indent = blackbird((start, middle, end) => [
    ...start,
    ...middle,
    ...end,
  ])(start, middle, end)

  return indent(stack)
}

const ifPass = passMessage => ({ pass, message }) => {
  return pass === true ? [passMessage + message] : false
}

const ifPend = pendMessage => ({ pass, fail, message }) => {
  return pass !== true && fial !== true
    ? [pendMessage + message]
    : false
}

const invariantToStringArray = invariant => {
  const passMessage = "ok      ╶╴ "
  const failMessage = "not ok  ┌╴ "
  const pendMessage = "pending ╶╴ "
  const leftPadding = "        "

  return (
    ifPass(passMessage, leftPadding)(invariant) ||
    ifFail(failMessage, leftPadding)(invariant) ||
    ifPend(pendMessage, leftPadding)(invariant)
  )
}

const flatten = v => {
  return [].concat(...v)
}

const print = plan => {
  console.log(
    [
      ...header(plan),
      ...flatten(
        plan.invariants.map(invariantToStringArray)
      ),
      ...footer(plan),
    ].join("\n")
  )
}

export { print, print as default }
