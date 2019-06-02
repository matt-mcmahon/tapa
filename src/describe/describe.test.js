import { statSync } from "fs"
import { fileURLToPath, resolve } from "url"
import { describe } from "./describe.js"

describe("describe module", async assert => {
  assert({
    given: 'a module named "./describe.js"',
    should: "have a default export",
    actual: typeof describe,
    expected: "function",
  })

  {
    const path = fileURLToPath(
      resolve(import.meta.url, "./describe.d.ts")
    )
    const dtsFile = statSync(path)
    const isFile =
      dtsFile && dtsFile.isFile && dtsFile.isFile()

    assert({
      given: 'a module named "describe"',
      should: 'have a "describe.d.ts" file',
      actual: isFile,
      expected: true,
    })
  }
})

describe("describe functionality", async assert => {
  assert.fail("No Functionality Tests")
})
