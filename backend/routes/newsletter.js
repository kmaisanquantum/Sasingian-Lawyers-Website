const express = require('express');
const crypto = require('crypto');
const { readJSON, writeJSON } = require('../utils/jsonStore');
const { validateNewsletter } = require('../middleware/validate');
const { formLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// POST /api/newsletter
router.post('/', formLimiter, validateNewsletter, (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const subscribers = readJSON('subscribers.json');

  const existing = subscribers.find((s) => s.email === email);
  if (existing) {
    return res.status(200).json({ message: 'You are already subscribed.' });
  }

  subscribers.push({
    id: crypto.randomUUID(),
    email,
    subscribedAt: new Date().toISOString()
  });
  writeJSON('subscribers.json', subscribers);

  res.status(201).json({ message: 'Subscribed. You will receive our next legal update.' });
});

module.exports = router;
