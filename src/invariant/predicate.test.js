'use strict'

const assert = require('assert')

const { T, F, equals, isSomething, getDefaultPredicate } = require('./predicate')

const message = 'message'
const actual = 'actual'
const expected = 'expected'
const predicate = v => v === true

{
  const m = `default when a predicate is defined should be that predicate`

  assert.deepStrictEqual(getDefaultPredicate({
    predicate
  }), predicate, m)

  assert.deepStrictEqual(getDefaultPredicate({
    message,
    actual,
    expected,
    predicate
  }), predicate, m)

  assert.deepStrictEqual(getDefaultPredicate({
    message,
    actual,
    predicate
  }), predicate, m)

  assert.deepStrictEqual(getDefaultPredicate({
    message,
    expected,
    predicate
  }), predicate, m)

  assert.deepStrictEqual(getDefaultPredicate({
    message,
    predicate
  }), predicate, m)

  assert.deepStrictEqual(getDefaultPredicate({
    actual,
    expected,
    predicate
  }), predicate, m)

  assert.deepStrictEqual(getDefaultPredicate({
    actual,
    predicate
  }), predicate, m)

  assert.deepStrictEqual(getDefaultPredicate({
    expected,
    predicate
  }), predicate, m)
}

{
  const expected = equals
  const message = `default when both actual and expected, but not predicate, should be equals`

  assert.deepStrictEqual(getDefaultPredicate({
    actual: 'actual',
    expected: 'expected'
  }), expected, message)

  assert.deepStrictEqual(getDefaultPredicate({
    message: 'message',
    actual: 'actual',
    expected: 'expected'
  }), expected, message)
}

{
  const expected = isSomething
  const actual = getDefaultPredicate({
    actual: 'actual'
  })
  const message = `default when only actual is defined should be isSomething`
  assert.deepStrictEqual(actual, expected, message)
}

{
  const expected = T
  const actual = getDefaultPredicate({
    message: 'message'
  })
  const message = `default when only message is defined should be T`
  assert.deepStrictEqual(actual, expected, message)
}

{
  const expected = F
  const actual = getDefaultPredicate({
    expected: 'expected'
  })
  const message = `default when only expected is defined should be F`
  assert.deepStrictEqual(actual, expected, message)
}
