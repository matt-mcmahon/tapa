import { describe } from "riteway"

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
  {
    const i = Promise.resolve({
      status: passing,
    })

    const given = inspect`${i}`
    {
      const should = inspect`be pending`
      const actual = isPending(i)
      const expected = true
      assert({ given, should, actual, expected })
    }

    {
      const should = inspect`not be passing`
      const actual = isPassing(i)
      const expected = false
      assert({ given, should, actual, expected })
    }

    {
      const should = inspect`not be failing`
      const actual = isFailing(i)
      const expected = false
      assert({ given, should, actual, expected })
    }

    {
      const should = inspect`resolve to passing`
      const actual = isPassing(await i)
      const expected = true
      assert({ given, should, actual, expected })
    }

    {
      const should = inspect`resolve not resolve to failing`
      const actual = isFailing(await i)
      const expected = false
      assert({ given, should, actual, expected })
    }

    {
      const should = inspect`resolve not resolve to pending`
      const actual = isPending(await i)
      const expected = false
      assert({ given, should, actual, expected })
    }
  }

  {
    const i = { status: failing }
    const given = inspect`${i}`

    {
      const should = inspect`not be pending`
      const actual = isPending(i)
      const expected = false
      assert({ given, should, actual, expected })
    }

    {
      const should = inspect`not be passing`
      const actual = isPassing(i)
      const expected = false
      assert({ given, should, actual, expected })
    }

    {
      const should = inspect`be failing`
      const actual = isFailing(i)
      const expected = true
      assert({ given, should, actual, expected })
    }
  }

  {
    const i = { status: pending }
    const given = inspect`${i}`

    {
      const should = inspect`be pending`
      const actual = isPending(i)
      const expected = true
      assert({ given, should, actual, expected })
    }

    {
      const should = inspect`not be passing`
      const actual = isPassing(i)
      const expected = false
      assert({ given, should, actual, expected })
    }

    {
      const should = inspect`not be failing`
      const actual = isFailing(i)
      const expected = false
      assert({ given, should, actual, expected })
    }
  }

  {
    const given = inspect`isPending(${undefined})`
    const should = inspect`return false`
    const actual = isPending()
    const expected = false
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`isPassing(${undefined})`
    const should = inspect`return false`
    const actual = isPassing()
    const expected = false
    assert({ given, should, actual, expected })
  }

  {
    const given = inspect`isFailing(${undefined})`
    const should = inspect`return false`
    const actual = isFailing()
    const expected = false
    assert({ given, should, actual, expected })
  }
})
