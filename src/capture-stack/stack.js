/**
 * Returns a copy of `target` _object_ that contains a new enumerable
 * property `stack`. This stack is a _string_ capturing the current
 * call-stack, but omitting any frames above the `omit` function.
 *
 * Specifically, we won't show frames for the function that decorates the
 * user's function.
 *
 * @param {function} omit    - captured call-stack will omit frames that are
 *                             above this function
 * @param {object}   target  - a copy of this object will be augmented with
 *                             the call-stack property, "stack"
 * @returns {{stack: string, <*>: *}}
 */
const associateStack = (omit, target = {}) => {
  Error.captureStackTrace(target, omit)
  Object.defineProperty(target, "stack", {
    enumerable: true
  })
  return target
}

/**
 * Augments the `factory` function so that it will return an _object_ with a
 * `stack` property, where this stack is _string_ whose value is the current
 * call-stack.
 *
 * @param {function} factory
 * @returns {function}
 */
const decorateWithStack = factory => {
  function decorated(...args) {
    return associateStack(decorated, factory(...args))
  }
  return decorated
}

module.exports = decorateWithStack
