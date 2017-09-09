'use strict'

const reportTitle = fileName => `Running Test: ${fileName}`

const T = {
  note: ['\u{0270E}', '✎', '!', '\u{0266A}', '♪'][2],
  pass: ['\u{02713}', '🗸', '√'][2],
  fail: ['\u{1F5F6}', '✗', 'x'][2],
  pend: ['\u{025A1}', '☐', '□'][2],
  bull: ['\u{02043}', '⁃', '-'][2],
  term: ['>'][0],
  reportTitle
}

module.exports = T
