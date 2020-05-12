import { bgCyan, red, yellow, green } from 'chalk'

import { flatten, has, ifElse, map } from '@mwm/functional'

import { bull, skip, pass, fail } from '../icons/index.js'

import { renderError, catchUncaughtExceptions } from './error.js'

catchUncaughtExceptions()

const header = ({ filename = module.parent.filename }) =>
  bgCyan.white(`Running Test: ${filename}`)

const renderAs = ({
  bullet = bull,
  colorFn = red,
  errorColor = 'red',
  verbose = false
}) => invariant => {
  const message = `${colorFn(bullet)}  ${invariant.message}`
  if (invariant.verbose || verbose) {
    return [message, '', renderError(errorColor, invariant)]
  } else {
    return [message]
  }
}

const renderSkip = renderAs({
  bullet: skip,
  colorFn: yellow,
  errorColor: 'yellow'
})

const renderSuccess = ifElse(
  has('ignore'),
  renderSkip,
  renderAs({
    bullet: pass,
    colorFn: green,
    errorColor: 'green'
  })
)

const renderFail = ifElse(
  has('ignore'),
  renderSkip,
  renderAs({
    bullet: fail,
    colorFn: red,
    errorColor: 'red',
    verbose: true
  })
)

const renderInvariant = inv => {
  if (inv.isSome && inv.isSome()) {
    return renderSkip(inv.some())
  } else if (inv.isFail()) {
    return renderFail(inv.fail())
  } else if (inv.isSuccess()) {
    return renderSuccess(inv.success())
  }
}

const printReport = plan => {
  plan.execute()
  const report = [
    '',
    '',
    header(plan),
    '',
    ...flatten(map(renderInvariant, plan))
  ]
  console.log(report.join('\n'))
  return plan
}

export default printReport
