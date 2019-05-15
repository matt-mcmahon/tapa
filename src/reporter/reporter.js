"use strict"

const chalk = require("chalk")
const R = require("ramda")
const icons = require("../icons")

const { renderError, catchUncaughtExceptions } = require("./error")
catchUncaughtExceptions()

const header = ({ filename = module.parent.filename }) =>
  chalk.bgCyan.white(`Running Test: ${filename}`)

const renderAs = ({
  bullet = icons.bull,
  colorFn = chalk.red,
  errorColor = "red",
  verbose = false
}) => invariant => {
  const message = `${colorFn(bullet)}  ${invariant.message}`
  if (invariant.verbose || verbose) {
    return [message, "", renderError(errorColor, invariant)]
  } else {
    return [message]
  }
}

const renderSkip = renderAs({
  bullet: icons.skip,
  colorFn: chalk.yellow,
  errorColor: "yellow"
})

const renderSuccess = R.ifElse(
  R.has("ignore"),
  renderSkip,
  renderAs({
    bullet: icons.pass,
    colorFn: chalk.green,
    errorColor: "green"
  })
)

const renderFail = R.ifElse(
  R.has("ignore"),
  renderSkip,
  renderAs({
    bullet: icons.fail,
    colorFn: chalk.red,
    errorColor: "red",
    verbose: true
  })
)

const renderInvariant = inv => {
  if (inv.isSome && inv.isSome()) {
    return renderSkip(inv.some())
  } else if (inv.isFail()) {
    return renderFail(inv.fail())
  } else if (inv.isSuccess()) {
    return renderSuccess(inv.success())
  }
}

const printReport = plan => {
  plan.execute()
  const report = [
    "",
    "",
    header(plan),
    "",
    ...R.flatten(R.map(renderInvariant, plan))
  ]
  console.log(report.join("\n"))
  return plan
}

module.exports = printReport
