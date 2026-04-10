const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load .env variables
dotenv.config();

const app = express();

// ── Middleware ──────────────────────────
app.use(cors());
app.use(express.json());

// Serve uploaded files publicly
// e.g. http://localhost:5000/uploads/yourfile.pdf
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ──────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resources', require('./routes/resources'));

// ── Health check route ──────────────────
app.get('/', (req, res) => {
  res.json({ message: '🎓 College Resource Platform is running!' });
});

// ── Start Server ────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});