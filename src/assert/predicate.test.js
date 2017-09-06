'use strict'

const { equals, isSomething, getDefaultPredicate } = require('./predicate')

const assert = ({
  plan,
  expected,
  message
}) => {
  const predicate = getDefaultPredicate(plan)
  console.log(`
Result: ${predicate === expected}
Message: ${message}
Predicate: ${typeof predicate} = ${predicate.toString()}
`)
}

{
  const predicate = v => !!v
  assert({
    plan: { predicate: predicate },
    expected: predicate,
    message: 'default when a predicate is defined should be that predicate'
  })
}

assert({
  plan: {},
  expected: isSomething,
  message: 'default when no expected, and no predicate, should be isSomething'
})

assert({
  plan: { expected: 'foo' },
  expected: equals,
  message: 'default when expected but no predicate should be equals'
})
