'use strict'

const chalk = require('chalk')
const R = require('ramda')
const T = require('../templates')

const { renderError, catchUncaughtExceptions } = require('./error')
catchUncaughtExceptions()

const cata = R.invoker(2, 'cata')

const header = chalk.bgCyan.white(` File: ${module.parent.filename} `)

const renderAs = (icon, colorFn, errorColor = 'red', verbose = false) => assert => {
  const messagePart = `${colorFn(icon)}  ${assert.message}`

  const errorPart = R.is(Error, assert.result)
                  ? renderError(errorColor, assert.result)
                  : false

  const printErrorReport = errorPart && (assert.verbose || verbose)
  if (printErrorReport) {
    return [messagePart, '', errorPart]
  } else {
    return [messagePart]
  }
}

const renderPass = renderAs(T.pass, chalk.green, 'green')
const renderFail = renderAs(T.fail, chalk.red, 'red', true)

const printReport = assertions => {
  console.log([
    '',
    '',
    header,
    '',
    ...R.flatten(R.map(cata(renderFail, renderPass), assertions))
  ].join('\n'))
}

module.exports = {
  printReport
}
