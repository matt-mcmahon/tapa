'use strict'

const chalk = require('chalk')
const R = require('ramda')
const icons = require('../icons')

const { renderError, catchUncaughtExceptions } = require('./error')
catchUncaughtExceptions()

const reportTitle = fileName => `Running Test: ${fileName}`

/**
 * @type {function(function, function)}
 * @param {function(A): bool} predicate
 * @param {function(A): B} whenFail
 * @param {function(A): C} whenPass
 * @return {B|C} This is the result
 */
const cata = R.invoker(2, 'cata')

const header = ({ filename = module.parent.filename }) =>
chalk.bgCyan.white(reportTitle(filename))

const renderAs = ({
  bullet = icons.bull,
  colorFn = chalk.red,
  errorColor = 'red',
  verbose = false
}) => assert => {
  const messagePart = `${colorFn(bullet)}  ${assert.message}`

  const errorPart = R.is(Error, assert.result)
                  ? renderError(errorColor, assert.result)
                  : ''

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

const renderPass = R.ifElse(
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

const getReport = plan => [
  '',
  '',
  header(plan),
  '',
  ...R.flatten(R.map(cata(renderFail, renderPass), plan))
]

const printReport = R.pipe(
  getReport,
  R.join('\n'),
  console.log
)

module.exports = printReport
