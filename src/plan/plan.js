'use strict'

const { Assert } = require('../assert')

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
    implementation(Assert(this))
  }

  static of (description, implementation) {
    return new Plan(description, implementation)
  }
}

module.exports = Plan
