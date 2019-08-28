import { test as describe } from "tap"

import { inspect } from "../inspect"

import { runner } from "./runner"
import { runner as indexExport } from "."
import { FSWatcher } from "chokidar"

describe("runner module", async assert => {
  {
    const given = inspect`module named ${"./runner"}`
    const should = inspect`have an export named ${runner}`
    const actual = typeof runner
    const expected = "function"
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`index export`
    const should = inspect`be identical to named export`
    const actual = indexExport
    const expected = runner
    assert({ given, should, actual, expected })
  }

  const paths = [
    "./src/runner/test/does-not-exist.js",
    "./src/runner/test/exists.js",
  ]
  const p = runner(paths)

  {
    const actual = p instanceof Promise
    const expected = true
    const given = inspect`runner(${paths})`
    const should = inspect`return a promise`
    assert({ given, should, actual, expected })
  }

  const { scripts, watcher } = await p

  await new Promise(resolve => {
    setTimeout(resolve, 500)
  })

  {
    const actual = watcher instanceof FSWatcher
    const expected = true
    const given = inspect`runner(...)`
    const should = inspect`resolve to a ${FSWatcher} instance`
    assert({ given, should, actual, expected })
  }

  const watched = watcher.getWatched()

  {
    const actual = watched
    const expected = {
      "src\\runner": ["test"],
      "src\\runner\\test": ["exists.js"],
    }
    const given = inspect`${watched}`
    const should = inspect`be ${expected}`
    assert({ given, should, actual, expected })
  }

  watcher.close()

  await new Promise(resolve => {
    setTimeout(resolve, 500)
  })

  {
    const actual = scripts
    const expected = "unknown"
    const given = inspect`${actual}`
    const should = inspect`be ${expected}`
    assert({ given, should, actual, expected })
  }
})
