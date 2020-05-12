import pa from './process-argument.js'
import test from '../node-assert/index.js'

const messageFor = (expected, actual) =>
  `should be { "${Object.keys(expected)
    .sort()
    .join(', ')}" } not { "${Object.keys(actual)
    .sort()
    .join(', ')}" }`

test(
  'src/assert/process-argument.test.js',
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
