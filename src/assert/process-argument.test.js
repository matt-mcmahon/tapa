const pa = require('./process-argument')
const assert = require('assert')

const messageFor = (expected, actual) => `should be { "${
  Object.keys(expected).sort().join(', ')
}" } not { "${
  Object.keys(actual).sort().join(', ')
}" }`

{
  const predicate = () => 'foo'
  const expected = {
    predicate, message: 'predicate'
  }
  const actual = pa(predicate)
  const message = messageFor(expected, actual)
  assert.deepStrictEqual(actual, expected, message)
}

{
  const expected = {
    message: 'some comment'
  }
  const actual = pa('some comment')
  const message = messageFor(expected, actual)
  assert.deepStrictEqual(actual, expected, message)
}

{
  const expected = {
    actual: 1
  }
  const actual = pa(1)
  const message = messageFor(expected, actual)
  assert.deepStrictEqual(actual, expected, message)
}

{
  const expected = {
    message: 'explicit definition'
  }
  const actual = pa({
    message: 'explicit definition'
  })
  const message = messageFor(expected, actual)
  assert.deepStrictEqual(actual, expected, message)
}
