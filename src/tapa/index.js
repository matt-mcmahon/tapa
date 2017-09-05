const assert = require('./assert')
const { IO, Either } = require('monet')
const R = require('ramda')
const T = require('./templates')

const dir = R.curryN(2, (n, v) => {
  console.dir(v, {
    colors: true,
    depth: n
  })
  return v
})
const log = console.log.bind(console)
const say = message => R.tap(log(message))

module.exports = (message, f) => IO(() => {
  const tests = f(assert)

  const mapFailPass = R.map(Either.either(
    () => ([1, 0]), // Fail; Left
    () => ([0, 1])  // Pass; Right
  ))
  const sumFailPass = R.reduce((a, v) => [a[0] + v[0], a[1] + v[1]], [0, 0])
  R.pipe(T.testHeader, log)([message])
  R.pipe(mapFailPass, sumFailPass, T.failPass, log)(tests)
})
