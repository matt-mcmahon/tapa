import { fork } from "child_process"
import { watch } from "chokidar"

export const forkOptions = { stdio: true }

export const watchOptions = {
  persistent: true,
  cwd: process.cwd(),
}

export const recordEventTo = scripts => event => [
  event,
  async script => {
    new Promise(resolve => {
      const cp = fork(script, [], forkOptions)
      cp.on("message", message => {
        scripts.set(script, message)
        cp.close()
        resolve({ key: script, value: message })
      })
      cp.on("error", err => {
        scripts.set(script, err)
        cp.close()
        resolve({ key: script, value: err })
      })
    })
  },
]

const log = event => [
  event,
  path => console.log(`${event}: ${path}`),
]

export const runner = (
  pattern = `./src/**/*.test.js`,
  options = watchOptions
) => {
  return new Promise((resolve, reject) => {
    const scripts = new Map()

    const run = recordEventTo(scripts)

    const watcher = watch(pattern, {
      ...options,
      ...watchOptions,
    })
      .on(...log("add"))
      .on(...run("add"))
      .on(...log("addDir"))
      .on(...log("change"))
      .on(...log("exit"))
      .on("exit", () => {
        resolve({ watcher, scripts })
      })
      .on(...log("unlink"))
      .on(...log("unlinkDir"))
      // .on("raw", (event, path, details) => { console.log("Raw event info:",  event, path, details) })
      .on(...log("ready"))
      .on("error", reject)
  })
}
