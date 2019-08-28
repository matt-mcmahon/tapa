import { test as describe } from "tap"

import { inspect } from "../inspect"

import {
  pending,
  passing,
  failing,
  isPending,
  isPassing,
  isFailing,
} from "./status"

describe("status module", async assert => {
  const promise = Promise.resolve({ status: passing })
  const tests = [
    {
      value: promise,
      expected: [true, false, false],
    },
    {
      value: { status: pending },
      expected: [true, false, false],
    },
    {
      value: await promise,
      expected: [false, true, false],
    },
    {
      value: { status: failing },
      expected: [false, false, true],
    },
    {
      value: pending,
      expected: [true, false, false],
    },
    {
      value: passing,
      expected: [false, true, false],
    },
    {
      value: failing,
      expected: [false, false, true],
    },
    {
      value: undefined,
      expected: [false, false, false],
    },
  ]

  tests.forEach(({ value, expected }) => {
    const actual = [
      isPending(value),
      isPassing(value),
      isFailing(value),
    ]
    const given = inspect`${value} to [isPending, isPassing, isFailing]`
    const should = inspect`be ${expected}`
    assert({ given, should, actual, expected })
  })
})
