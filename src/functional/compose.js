module.exports = (...fs) => v => fs.reduceRight((v, f) => f(v), v)
