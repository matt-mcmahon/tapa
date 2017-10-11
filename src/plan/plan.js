'use strict'

const { assert } = require('../assert')

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
    implementation(assert(this))
  }

  map (f) {
    return [...this].map(f)
  }

  execute () {
    return this.map(v => v.run())
  }

  static of (description, implementation) {
    return new Plan(description, implementation)
  }
}

module.exports = Plan
