const rateLimit = require('express-rate-limit');

// General API traffic: generous, protects against scraping/abuse.
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again shortly.' }
});

// Form submissions (contact intake, newsletter): tighter, prevents spam bots.
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions from this address. Please try again later.' }
});

module.exports = { apiLimiter, formLimiter };
