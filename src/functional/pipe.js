module.exports = (...fs) => v => fs.reduce((v, f) => f(v), v)
