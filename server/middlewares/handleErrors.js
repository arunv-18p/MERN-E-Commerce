const ErrorHandler = require("../utils/errorHandler.js");

const handleErrors = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'something went wrong';
    const isDevEnv = process.env.NODE_ENV === 'development';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: isDevEnv ? err.stack : {}
    })
}

module.exports = handleErrors;