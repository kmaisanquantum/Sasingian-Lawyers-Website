const express = require('express');
const { readJSON } = require('../utils/jsonStore');

const router = express.Router();

// GET /api/people?q=&category=
router.get('/', (req, res) => {
  const { q = '', category = 'all' } = req.query;
  const query = String(q).trim().toLowerCase();
  const cat = String(category);

  let results = readJSON('people.json');

  if (cat !== 'all') {
    results = results.filter((p) => p.category === cat);
  }
  if (query) {
    results = results.filter((p) =>
      [p.title, p.summary, p.category].join(' ').toLowerCase().includes(query)
    );
  }

  res.json({ count: results.length, results });
});

// GET /api/people/:id
router.get('/:id', (req, res) => {
  const people = readJSON('people.json');
  const found = people.find((p) => p.id === req.params.id);
  if (!found) return res.status(404).json({ error: 'Person group not found' });
  res.json(found);
});

module.exports = router;
