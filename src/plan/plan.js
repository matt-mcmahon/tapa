import { assert } from '../assert/index.js'

const getFirstParent = module => {
  if (module.parent) {
    return getFirstParent(module.parent)
  } else {
    return module.filename
  }
}

class Plan extends Array {
  constructor (description, implementation) {
    super()
    this.description = description
    this.filename = getFirstParent(module)

    if (typeof implementation === 'function') {
      implementation(assert(this))
    }
  }

  execute () {
    this.forEach((inv, index, array) => {
      array[index] = inv.run()
    })
    return this
  }

  // I'm using an incompatible constructor, so this is necessary in order to
  // make map, concat, and other methods that return a new array work correctly.
  static get [Symbol.species] () {
    return Array
  }

  static of (description, implementation) {
    return new Plan(description, implementation)
  }

  static plan (description, implementation) {
    return new Plan(description, implementation)
  }
}

export default Plan
