const chalk = require('chalk')
const R = require('ramda')
const { map, prop, pipe, tap, invoker, concat, toString } = R

const renderError = require('./error')

const { pass, fail } = require('../templates')

const log = console.log.bind(console)
const err = console.error.bind(console)
const lf = tap(() => console.log(''))
const cata = invoker(2, 'cata')

const logPass = pipe(
  prop('message'),
  toString,
  concat(chalk.green(pass)),
  log
)

const logError = tap(pipe(
  prop('result'),
  renderError,
  err
))

const logFail = tap(pipe(
  prop('message'),
  toString,
  concat(chalk.red(fail)),
  err
))

module.exports = map(cata(
  pipe(logFail, lf, logError),
  logPass
))
