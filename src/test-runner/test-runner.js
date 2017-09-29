'use strict'

const { fork } = require('child_process')
const { IO } = require('monet')
const { watch } = require('chokidar')

const { printError } = require('../reporter')

const runScript = script => fork(script, null, { stdio: true })

const runner = (persistent = false) =>
(pattern = `./src/**/*.test.js`) =>
IO(async () => {
  watch(pattern, { cwd: process.cwd(), persistent })
    .on('change', runScript)
    .on('add', runScript)
    .on('error', printError)
})

module.exports = runner
