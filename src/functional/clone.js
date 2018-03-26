'use strict'

const recursiveClone = (value, refs) => {
  const existingClone = refs.get(value)
  if (existingClone) {
    return existingClone
  } else if (Array.isArray(value)) {
    return cloneArray(value, refs)
  } else if (value instanceof Date) {
    return cloneDate(value)
  } else if (value instanceof Object) {
    return cloneObject(value, refs)
  } else {
    return value
  }
}

const cloneArray = (arr, refs) => {
  const clone = []
  refs.set(arr, clone)
  arr.reduce((clone, value) => {
    clone.push(recursiveClone(value, refs))
    return clone
  }, clone)
  return clone
}

const cloneDate = date => new Date(date.valueOf())

const cloneObject = (obj, refs) => {
  const clone = {}
  refs.set(obj, clone)
  const keys = Object.keys(obj)
  keys.reduce((clone, key) => {
    clone[key] = recursiveClone(obj[key], refs)
    return clone
  }, clone)
  return clone
}

module.exports = value => recursiveClone(value, new Map())

/**
 * Adapted from:
 *
 *   https://github.com/thebearingedge/deep-clone
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Tim Davis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
