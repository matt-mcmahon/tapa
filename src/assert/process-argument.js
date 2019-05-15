module.exports = argument => {
  if (typeof argument === "string") {
    return {
      message: argument
    }
  } else if (typeof argument === "function") {
    return {
      message: argument.name,
      predicate: argument
    }
  } else if (typeof argument !== "object") {
    return {
      actual: argument
    }
  } else {
    return argument
  }
}
