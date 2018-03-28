const pa = require('./process-argument')
const test = require('../node-assert')

const messageFor = (expected, actual) =>
  `should be { "${Object.keys(expected)
    .sort()
    .join(', ')}" } not { "${Object.keys(actual).sort().join(', ')}" }`

test(
  __filename,
  t => {
    const predicate = () => 'foo'
    const expected = {
      predicate,
      message: 'predicate'
    }
    const actual = pa(predicate)
    const message = messageFor(expected, actual)
    t.deepStrictEqual(actual, expected, message)
  },
  t => {
    const expected = {
      message: 'some comment'
    }
    const actual = pa('some comment')
    const message = messageFor(expected, actual)
    t.deepStrictEqual(actual, expected, message)
  },
  t => {
    const expected = {
      actual: 1
    }
    const actual = pa(1)
    const message = messageFor(expected, actual)
    t.deepStrictEqual(actual, expected, message)
  },
  t => {
    const expected = {
      message: 'explicit definition'
    }
    const actual = pa({
      message: 'explicit definition'
    })
    const message = messageFor(expected, actual)
    t.deepStrictEqual(actual, expected, message)
  }
)
