import { fork } from 'child_process'
import { IO } from 'monet'
import { watch } from 'chokidar'

import { printError } from '../reporter/index.js'

const runScript = script => fork(script, null, { stdio: true })

const runner = (persistent = false) =>
  (pattern = './src/**/*.test.js') =>
    IO(async () => {
      watch(pattern, { cwd: process.cwd(), persistent })
        .on('change', runScript)
        .on('add', runScript)
        .on('error', printError)
    })

export default runner
