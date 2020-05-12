import { printReport } from './index.js'
import { plan } from '../plan/index.js'
import { deepStrictEqual } from 'assert'

const hasKeys = (object, ...keys) => {
  const expected = keys.sort()
  const actual = Object.keys(object).sort()
  const message = `should have own properties "${expected.join(', ')}" not "${actual.join(', ')}"`
  deepStrictEqual(actual, expected, message)
}

const p = plan('Reporter Test', assert => {
  {
    const invariant = assert({
      expected: 1,
      actual: 1,
      message: 'should pass'
    })
    hasKeys(invariant, 'expected', 'actual', 'message', 'stack')
  }

  {
    const invariant = assert.fails({
      expected: 1,
      actual: 2,
      message: 'should pass with a GREEN error report',
      verbose: true
    })
    hasKeys(invariant, 'fails', 'verbose', 'expected', 'actual', 'message', 'stack')
  }

  {
    const invariant = assert({
      expected: 1,
      actual: 2,
      message: 'should fail with a RED error report',
      verbose: true
    })
    hasKeys(invariant, 'expected', 'actual', 'message', 'stack', 'verbose')
  }

  {
    const invariant = assert.skip({
      expected: 1,
      actual: 2,
      message: 'should be skipped with a Yellow error report',
      verbose: true
    })
    hasKeys(invariant, 'expected', 'actual', 'message', 'stack', 'verbose', 'skip')
  }
})

printReport(p)
