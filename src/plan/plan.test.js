'use strict'

const nodeAssert = require('assert')
const { of: plan } = require('./plan')

const description = 'Test Plan'

const T = () => true

const test = plan(description, tapaAssert => {
  tapaAssert({ message: 'test 1', predicate: T })
  tapaAssert({ message: 'test 2', predicate: T })
  tapaAssert({ message: 'test 3', predicate: T })
})

{
  const expected = description
  const actual = test.description
  const message = `test.description should be "${expected}" not "${actual}"`
  nodeAssert.deepStrictEqual(actual, expected, message)
}

{
  const expected = 3
  const actual = test.length
  const message = `test.length should be "${expected}" not "${actual}"`
  nodeAssert.deepStrictEqual(actual, expected, message)
}

{
  const expected = __filename
  const actual = test.filename
  const message = `Should be "${expected}" not "${actual}"`
  nodeAssert.deepStrictEqual(actual, expected, message)
}

const results = test.execute()

console.dir(results, {
  colors: true,
  showHidden: true,
  depth: 5
})
