"use strict"

const PrettyError = require("pretty-error")
const { pipe } = require("ramda")

const icons = require("../icons")

/**
 * Returns a JSON-encoded CSS description for the Error report.
 *
 * @param {string} color - Base color used by accents in the report,
 *                         `"red"`, `"green"`, `"blue"`, etc.
 *
 * @returns {CSS}
 */
const style = color => ({
  "pretty-error": {
    marginLeft: 3,
  },

  "pretty-error > header > title > kind": {
    display: "none",
  },

  "pretty-error > header > colon": {
    display: "none",
  },

  "pretty-error > header > message": {
    color: "bright-white",
    background: color,
    padding: "0 1",
  },

  "pretty-error > trace": {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },

  "pretty-error > trace > item": {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 2,
    bullet: `"<grey>${icons.bull}</grey>"`,
  },

  "pretty-error > trace > item > header > pointer > file": {
    color: `bright-${color}`,
  },

  "pretty-error > trace > item > header > pointer > colon": {
    color: color,
  },

  "pretty-error > trace > item > header > pointer > line": {
    color: `bright-${color}`,
  },

  "pretty-error > trace > item > header > what": {
    color: "bright-white",
  },

  "pretty-error > trace > item > footer > addr": {},
})

/**
 * Transforms the given error, `err`, into a color-encoded console string,
 * using the base `color` (e.g. `"red"`, `"green"`, etc).
 *
 * @param {string} color - Base color used by accents in the report,
 *                         "red", "green", "blue", etc.
 * @param {Error} err    - The error we want pretty-printed.
 * @returns {string} A color-encoded console string
 */
const renderError = (color = "red", err) => {
  const pe = new PrettyError()
  pe.skipNodeFiles()
  pe.appendStyle(style(color))

  return pe.render(err)
}

/**
 * Modifies the run-time so that Node will Pretty Print uncaught errors to `stderr`.
 */
const catchUncaughtExceptions = () => {
  process.on("uncaughtException", err => {
    console.error(renderError("red", err))
  })
}

const printError = pipe(
  renderError,
  console.err
)

module.exports = {
  renderError,
  printError,
  catchUncaughtExceptions,
}
