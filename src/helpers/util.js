function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const gracefulError = (error, req, res, next) => {
  res.status(500).send({
    error: error.toString()
  })
}



module.exports = {
  sleep,
  gracefulError
}

