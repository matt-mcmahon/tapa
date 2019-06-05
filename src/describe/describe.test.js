import { describe } from "./describe.js"
import { dtsExists } from "./dtsExists"

describe("describe module", async assert => {
  assert({
    given: 'the module "./describe.js"',
    should: 'have an export named "describe"',
    actual: typeof describe,
    expected: "function",
  })

  assert({
    given: `the module "./describe.js"`,
    should: `have a "./describe.d.ts" file`,
    actual: dtsExists(import.meta.url, "describe"),
    expected: true,
  })

  assert.fail("No Functionality Tests")
})
