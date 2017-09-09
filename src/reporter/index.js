'use strict'

const chalk = require('chalk')
const R = require('ramda')
const T = require('../templates')

const { renderError, catchUncaughtExceptions } = require('./error')
catchUncaughtExceptions()

/**
 * @type {function(function, function)}
 * @param {function(A): bool} predicate
 * @param {function(A): B} whenFail
 * @param {function(A): C} whenPass
 * @return {B|C} This is the result
 */
const cata = R.invoker(2, 'cata')

const header = chalk.bgCyan.white(T.reportTitle(module.parent.filename))

const renderAs = ({
  bullet = T.bull,
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
  bullet: T.pend,
  colorFn: chalk.yellow,
  errorColor: 'yellow'
})

const renderPass = R.ifElse(
  R.has('ignore'),
  renderSkip,
  renderAs({
    bullet: T.pass,
    colorFn: chalk.green,
    errorColor: 'green'
  })
)

const renderFail = R.ifElse(
  R.has('ignore'),
  renderSkip,
  renderAs({
    bullet: T.fail,
    colorFn: chalk.red,
    errorColor: 'red',
    verbose: true
  })
)

const getReport = assertions => [
  '',
  '',
  header,
  '',
  ...R.flatten(R.map(cata(renderFail, renderPass), assertions))
]

const printReport = R.pipe(
  getReport,
  R.join('\n'),
  console.log
)

const printError = R.pipe(
  renderError,
  console.err
)

module.exports = {
  printReport, printError
}
