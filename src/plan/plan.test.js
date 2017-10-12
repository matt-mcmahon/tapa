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

{
  const a = test.execute()
  const b = a.reduce(([pass, fail, skip], v) => {
    return v.cata(
      () => [pass, fail + 1, skip],
      () => [pass + 1, fail, skip]
    )
  }, [0, 0, 0])

  const expected = [3, 0, 0]
  const actual = b
  const message = `Should be "${expected}" not "${actual}"`
  nodeAssert.deepStrictEqual(actual, expected, message)
}
