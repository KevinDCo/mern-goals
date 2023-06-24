const errorHandler = (err, req, res, next) => {
    // return status code if set before, otherwise send server error 500
    const statusCode = res.statusCode ? res.statusCode : 500

    // send json message instead of default html, if in production don't show the stack
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}