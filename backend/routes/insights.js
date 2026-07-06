const express = require('express');
const { readJSON } = require('../utils/jsonStore');

const router = express.Router();

// GET /api/insights?q=&category=
router.get('/', (req, res) => {
  const { q = '', category = 'all' } = req.query;
  const query = String(q).trim().toLowerCase();
  const cat = String(category);

  let results = readJSON('insights.json');

  if (cat !== 'all') {
    results = results.filter((i) => i.category === cat);
  }
  if (query) {
    results = results.filter((i) =>
      [i.title, i.summary, i.act, i.category].join(' ').toLowerCase().includes(query)
    );
  }

  results = results.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json({ count: results.length, results });
});

router.get('/:id', (req, res) => {
  const insights = readJSON('insights.json');
  const found = insights.find((i) => i.id === req.params.id);
  if (!found) return res.status(404).json({ error: 'Insight not found' });
  res.json(found);
});

module.exports = router;
