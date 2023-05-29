const rateLimit = require('express-rate-limit');
const TooManyRequestsError = require('../errors/TooManyRequestsError');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (request, response, next) => next(new TooManyRequestsError('Превышен лимит запросов, попробуйте позже')),
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
