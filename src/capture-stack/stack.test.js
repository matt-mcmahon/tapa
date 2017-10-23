const assert = require('assert')
const captureStack = require('./stack')

{
  const expected = 'function'
  const actual = typeof captureStack
  const message = `type should be "${expected}" not "${actual}"`
  assert.deepStrictEqual(actual, expected, message)
}

const factory = (name, options = {}) =>
  Object.assign({}, options, { name })

const decoratedFactory = captureStack(factory)

{
  const expected = 'function'
  const actual = typeof decoratedFactory
  const message = `typeof factory should be "${expected}" not "${actual}"`
  assert.deepStrictEqual(actual, expected, message)
}

const obj = decoratedFactory('capture-test', {
  value: 'foo',
  message: 'this message should appear after object.name'
})

{
  const expected = 'string'
  const actual = typeof obj.stack
  const message = `stack should be a string`
  assert.deepStrictEqual(actual, expected, message)
}

{
  const file = __filename
  const expected = true
  const actual = obj.stack.includes(file)
  const message = `should contain this file in the stack`
  assert.deepStrictEqual(actual, expected, message)
}

{
  const file = require.resolve('./stack')
  const expected = false
  const actual = obj.stack.includes(file)
  const message = `should NOT contain stack module in the stack`
  assert.deepStrictEqual(actual, expected, message)
}

{
  const expected = true
  const actual = obj.stack.length > 1
  const message = `it's length should be greater than 1, not ${actual}`
  assert.deepStrictEqual(actual, expected, message)
}

{
  const expected = 'capture-test'
  const actual = obj.name
  const message = `it should inherit "name" from the factory function`
  assert.deepStrictEqual(actual, expected, message)
}

{
  const expected = 'foo'
  const actual = obj.value
  const message = `it should inherit "value" from the factory function`
  assert.deepStrictEqual(actual, expected, message)
}

{
  const lines = obj.stack.split('\n')
  const expected = `${obj.name}: ${obj.message}`
  const actual = lines[0]
  const message = `line zero should be "${expected}" not "${actual}"`
  assert.deepStrictEqual(actual, expected, message)
}
