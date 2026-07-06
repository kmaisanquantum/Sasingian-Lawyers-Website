const express = require('express');
const { readJSON } = require('../utils/jsonStore');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(readJSON('expertise.json'));
});

router.get('/services', (req, res) => {
  res.json(readJSON('expertise.json').coreServices);
});

router.get('/sectors', (req, res) => {
  res.json(readJSON('expertise.json').sectors);
});

module.exports = router;
