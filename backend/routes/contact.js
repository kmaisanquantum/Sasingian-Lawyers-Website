const express = require('express');
const crypto = require('crypto');
const { appendJSON } = require('../utils/jsonStore');
const { validateContact } = require('../middleware/validate');
const { formLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// POST /api/contact
router.post('/', formLimiter, validateContact, (req, res) => {
  const { fullName, orgName = '', matterType = '', matterDetail, email } = req.body;

  const record = {
    id: crypto.randomUUID(),
    fullName: fullName.trim(),
    orgName: orgName.trim(),
    matterType,
    matterDetail: matterDetail.trim(),
    email: email.trim().toLowerCase(),
    receivedAt: new Date().toISOString()
  };

  appendJSON('submissions.json', record);

  res.status(201).json({
    message: 'Enquiry received. Our team will respond within two business days.',
    id: record.id
  });
});

module.exports = router;
