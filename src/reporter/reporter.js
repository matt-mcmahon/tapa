'use strict'

const chalk = require('chalk')
const R = require('ramda')
const icons = require('../icons')

const log = R.tap(R.bind(console.log, console))

const { renderError, catchUncaughtExceptions } = require('./error')
catchUncaughtExceptions()

const cata = R.invoker(2, 'cata')

const header = ({ filename = module.parent.filename }) =>
chalk.bgCyan.white(`Running Test: ${filename}`)

const renderAs = ({
  bullet = icons.bull,
  colorFn = chalk.red,
  errorColor = 'red',
  verbose = false
}) => assert => {
  const messagePart = `${colorFn(bullet)}  ${assert.message}`

  const errorPart = renderError(errorColor, assert)

  const printErrorReport = !!errorPart && (!!assert.verbose || verbose)

  if (printErrorReport) {
    return [messagePart, '', errorPart]
  } else {
    return [messagePart]
  }
}

const renderSkip = renderAs({
  bullet: icons.pend,
  colorFn: chalk.yellow,
  errorColor: 'yellow'
})

const renderSuccess = R.ifElse(
  R.has('ignore'),
  renderSkip,
  renderAs({
    bullet: icons.pass,
    colorFn: chalk.green,
    errorColor: 'green'
  })
)

const renderFail = R.ifElse(
  R.has('ignore'),
  renderSkip,
  renderAs({
    bullet: icons.fail,
    colorFn: chalk.red,
    errorColor: 'red',
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
    '',
    '',
    header(plan),
    '',
    ...R.flatten(R.map(renderInvariant, plan))
  ]
  console.log(report.join('\n'))
  return plan
}

module.exports = printReport
