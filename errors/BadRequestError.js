const http2 = require('node:http2');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = http2.constants.HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = BadRequestError;
