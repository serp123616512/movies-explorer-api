const http2 = require('node:http2');

const handlerError = (err, _, res, next) => {
  const defaultErrorCode = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const { statusCode = defaultErrorCode, message } = err;
  res.status(statusCode).send({ message: statusCode === defaultErrorCode ? 'Произошла ошибка на сервере' : message });
  next();
};

module.exports = handlerError;
