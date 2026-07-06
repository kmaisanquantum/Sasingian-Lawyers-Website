const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(req, res, next) {
  const { fullName, email, matterDetail } = req.body || {};
  const errors = [];

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    errors.push('fullName is required (min 2 characters).');
  }
  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    errors.push('A valid email is required.');
  }
  if (!matterDetail || typeof matterDetail !== 'string' || matterDetail.trim().length < 10) {
    errors.push('matterDetail is required (min 10 characters).');
  }

  if (errors.length) {
    return res.status(422).json({ error: 'Validation failed', details: errors });
  }
  next();
}

function validateNewsletter(req, res, next) {
  const { email } = req.body || {};
  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return res.status(422).json({ error: 'Validation failed', details: ['A valid email is required.'] });
  }
  next();
}

module.exports = { validateContact, validateNewsletter };
