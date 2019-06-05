import R from "ramda"

const maxLength = 80

const width = 9

const indentWith = char =>
  R.pipe(
    R.trim,
    s => `${char} ${s}`,
    s => s.padStart(width, " ")
  )

export const first = R.pipe(
  R.slice(0, 1),
  R.map(indentWith("> "))
)

export const body = R.pipe(
  R.slice(1, -1),
  R.map(indentWith("| "))
)

export const last = R.pipe(
  R.slice(-1, Infinity),
  R.map(indentWith("- "))
)

export const indent = message => {
  message
    .split("\n")
    .map(
      converge((first, body, last) => [
        first,
        ...body,
        last,
      ]),
      [first, body, last]
    )
    .join("\n")
}

export const repeat = (char = "-", length = maxLength) =>
  `${"".padEnd(length, char)}`

export const header = ({ description }) =>
  ["", "", repeat("="), description, repeat("-"), ""].join(
    "\n"
  )

export const footer = ({ total, pass, fail }) =>
  [
    "",
    repeat("-"),
    `Total ${total}     Pass ${pass}     Fail ${fail}`,
    repeat("="),
    "",
    "",
  ].join("\n")

export const print = ({
  description,
  total,
  pass,
  fail,
  invariants,
}) => {
  console.log(
    header({ description }),
    invariants
      .map(invariant => {
        const { message, stack, pass, fail } = invariant
        if (pass === true) {
          return `      ok : ${message}`
        } else if (fail === true) {
          return `  not ok : ${message}\n${indent(stack)}`
        } else {
          return ` pending : ${message}`
        }
      })
      .join("\n"),
    footer({ total, pass, fail })
  )
}

export default print
