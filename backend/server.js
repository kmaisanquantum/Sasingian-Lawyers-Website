require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const logger = require('./middleware/logger');
const { apiLimiter } = require('./middleware/rateLimiter');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const peopleRoutes = require('./routes/people');
const expertiseRoutes = require('./routes/expertise');
const insightsRoutes = require('./routes/insights');
const careersRoutes = require('./routes/careers');
const contactRoutes = require('./routes/contact');
const newsletterRoutes = require('./routes/newsletter');

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');

// ---- Global middleware ----
app.use(helmet({
  contentSecurityPolicy: false // allows the Google Maps iframe + Google Fonts used by the frontend
}));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '100kb' }));
app.use(logger);

// ---- API routes ----
app.use('/api/people', apiLimiter, peopleRoutes);
app.use('/api/expertise', apiLimiter, expertiseRoutes);
app.use('/api/insights', apiLimiter, insightsRoutes);
app.use('/api/careers', apiLimiter, careersRoutes);
app.use('/api/contact', contactRoutes);       // has its own stricter form limiter
app.use('/api/newsletter', newsletterRoutes); // has its own stricter form limiter

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---- Static frontend ----
app.use(express.static(FRONTEND_DIR));
app.get('/', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

// ---- 404 + error handling (must be last) ----
app.use('/api', notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Sasingian Lawyers server running at http://localhost:${PORT}`);
});
