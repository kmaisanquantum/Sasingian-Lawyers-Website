const express = require('express');
const { readJSON } = require('../utils/jsonStore');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(readJSON('careers.json'));
});

router.get('/vacancies', (req, res) => {
  res.json(readJSON('careers.json').vacancies);
});

module.exports = router;
