const failPass = ([fail = 0, pass = 0]) => `

Ran ${fail + pass} Tests:
${T.pass} ${pass} tests passed \t
${T.fail} ${fail} tests failed \t

` // end failPass

const testHandler = ([message = 'Anonymous']) =>
`Running tests "${message}"`

const T = {
  note: ['\u{0270E}', '✎', '!', '\u{0266A}', '♪'][2] + '  ',
  pass: ['\u{02713}', '🗸', '√'][2] + '  ',
  fail: ['\u{1F5F6}', '✗', 'x'][2] + '  ',
  pend: ['\u{025A1}', '☐', '□', '\u{2043}', '⁃'][2] + '  ',
  failPass,
  testHandler
}

module.exports = T
