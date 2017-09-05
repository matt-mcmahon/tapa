const { fork } = require('child_process')
const chalk = require('chalk')

const tests = [
  './src/assert/assert.test.js',
  './src/reporter/reporter.test.js',
  './src/tapa/tapa.test.js',
  './src/templates/templates.test.js'
]

console.log('\n')

tests.forEach(script => {
  const filePath = ` Running: ${__dirname.replace(/\\/g, '/') + script.substr(5) + ' '}`
  console.log(chalk.bgCyan.white(filePath), '\n')
  fork(script, null, {
    stdio: true
  })
})
