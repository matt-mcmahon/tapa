const isPromise = v => v instanceof Promise
const isNil = v => v === undefined || v === null

class Status {
  constructor(long, short) {
    Object.defineProperties(this, {
      is: {
        value: long,
        enumerable: true,
      },
      valueOf: {
        value: function valueOf() {
          return long
        },
      },
      toString: {
        value: function toString() {
          return short
        },
      },
    })
  }
}

export const pending = new Status("pending", "[_]")

export const passing = new Status("passing", "[+]")

export const failing = new Status("failing", "[-]")

export const isPending = v =>
  isPromise(v) || (!isNil(v) && v.status == "pending")

export const isPassing = v =>
  !isNil(v) && !isPromise(v) && v.status == "passing"

export const isFailing = v =>
  !isNil(v) && !isPromise(v) && v.status == "failing"
