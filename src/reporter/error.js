'use strict'

const PrettyError = require('pretty-error')

const style = color => ({
  'pretty-error': {
    marginLeft: 3
  },

  'pretty-error > header > title > kind': {
    display: 'none'
  },

  'pretty-error > header > colon': {
    display: 'none'
  },

  'pretty-error > header > message': {
    color: 'bright-white',
    background: color,
    padding: '0 1'
  },

  'pretty-error > trace': {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0
  },

  'pretty-error > trace > item': {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 2,
    bullet: `"<grey>⁃</grey>"`
  },

  'pretty-error > trace > item > header > pointer > file': {
    color: `bright-${color}`
  },

  'pretty-error > trace > item > header > pointer > colon': {
    color: color
  },

  'pretty-error > trace > item > header > pointer > line': {
    color: `bright-${color}`
  },

  'pretty-error > trace > item > header > what': {
    color: 'bright-white'
  },

  'pretty-error > trace > item > footer > addr': {
  }
})

const renderError = (color = 'red', err) => {
  const pe = new PrettyError()
  pe.skipNodeFiles()
  pe.appendStyle(style(color))

  return pe.render(err)
}

const catchUncaughtExceptions = () => {
  process.on('uncaughtException', err => {
    console.log(renderError('red', err))
  })
}

module.exports = {
  renderError, catchUncaughtExceptions
}
