import test from "../node-assert/index.js"
import { default as captureStack } from "./stack.js"
import { normalize } from "path"
import { fileURLToPath } from "url"

const factory = (name, options = {}) =>
  Object.assign({}, options, { name })

const decoratedFactory = captureStack(factory)

const obj = decoratedFactory("capture-test", {
  value: "foo",
  message:
    "this message should appear after object.name",
})

const fileName = fileURLToPath(import.meta.url)

test(
  fileName,
  t => {
    const expected = "function"
    const actual = typeof captureStack
    const message = `type should be "${expected}" not "${actual}"`
    t.deepStrictEqual(actual, expected, message)
  },
  t => {
    const expected = "function"
    const actual = typeof decoratedFactory
    const message = `typeof factory should be "${expected}" not "${actual}"`
    t.deepStrictEqual(actual, expected, message)
  },
  t => {
    const expected = "string"
    const actual = typeof obj.stack
    const message = `stack should be a string`
    t.deepStrictEqual(actual, expected, message)
  },
  t => {
    const expected = true
    const actual = obj.stack.includes(fileName)
    const message = `should contain file ${fileName} in the stack\n${obj.stack}`
    t.deepStrictEqual(actual, expected, message)
  },
  t => {
    const file = require.resolve("./stack")
    const expected = false
    const actual = obj.stack.includes(file)
    const message = `should NOT contain stack module in the stack`
    t.deepStrictEqual(actual, expected, message)
  },
  t => {
    const expected = true
    const actual = obj.stack.length > 1
    const message = `it's length should be greater than 1, not ${actual}`
    t.deepStrictEqual(actual, expected, message)
  },
  t => {
    const expected = "capture-test"
    const actual = obj.name
    const message = `it should inherit "name" from the factory function`
    t.deepStrictEqual(actual, expected, message)
  },
  t => {
    const expected = "foo"
    const actual = obj.value
    const message = `it should inherit "value" from the factory function`
    t.deepStrictEqual(actual, expected, message)
  },
  t => {
    const lines = obj.stack.split("\n")
    const expected = `${obj.name}: ${obj.message}`
    const actual = lines[0]
    const message = `line zero should be "${expected}" not "${actual}"`
    t.deepStrictEqual(actual, expected, message)
  }
)
