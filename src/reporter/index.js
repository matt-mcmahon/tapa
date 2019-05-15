"use strict"

const {
  renderError,
  printError,
  catchUncaughtExceptions
} = require("./error.js")

module.exports = {
  printReport: require("./reporter"),
  renderError,
  printError,
  catchUncaughtExceptions
}
