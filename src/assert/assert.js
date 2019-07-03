import { invariant, Status } from "../invariant"

const assert = async block => {
  const i = invariant({
    ...block,
  })

  const j = await i.test(assert)

  return {
    passing: j.status === Status.passing ? 1 : 0,
    failing: j.status === Status.failing ? 1 : 0,
    total: 1,
    invariant: j,
  }
}

export { assert }
