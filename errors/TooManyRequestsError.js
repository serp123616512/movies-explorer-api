const http2 = require('node:http2');

class TooManyRequestsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = http2.constants.HTTP_STATUS_TOO_MANY_REQUESTS;
  }
}

module.exports = TooManyRequestsError;
