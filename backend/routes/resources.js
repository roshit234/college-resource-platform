const express = require('express');
const multer = require('multer');
const path = require('path');
const ResourceModel = require('../models/resourceModel');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// ─────────────────────────────────────────
// Multer Setup (handles file uploads)
// ─────────────────────────────────────────
const storage = multer.diskStorage({

  // Where to save the file
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  // What to name the file (make it unique to avoid overwriting)
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // e.g. ".pdf"
    cb(null, uniqueName + ext);
  }
});

// Only allow these file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|ppt|pptx|doc|docx|txt|png|jpg|jpeg/;
  const ext = path.extname(file.originalname).toLowerCase().slice(1);
  if (allowedTypes.test(ext)) {
    cb(null, true);  // accept the file
  } else {
    cb(new Error('Only PDF, PPT, DOC, TXT, and image files are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // max 10MB
});

// ─────────────────────────────────────────
// POST /api/resources/upload
// Upload a new resource (must be logged in)
// ─────────────────────────────────────────
router.post('/upload', protect, upload.single('file'), (req, res) => {
  // 'protect' runs first (checks token), then multer saves the file, then this runs

  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }

  const { title, subject, description } = req.body;

  if (!title || !subject) {
    return res.status(400).json({ message: 'Title and subject are required' });
  }

  // Save resource info to our dummy database
  const resource = ResourceModel.create({
    title,
    subject,
    description,
    filename: req.file.filename,         // saved file name (unique)
    originalName: req.file.originalname, // original file name
    uploadedBy: req.user.id,             // from the JWT token
    uploaderName: req.user.name,
    fileType: path.extname(req.file.originalname).slice(1).toLowerCase()
  });

  res.status(201).json({
    message: 'Resource uploaded successfully!',
    resource
  });
});

// ─────────────────────────────────────────
// GET /api/resources
// Get all resources (public — no login needed)
// ─────────────────────────────────────────
router.get('/', (req, res) => {
  const { search, subject } = req.query;
  // Example: /api/resources?search=maths
  // Example: /api/resources?subject=physics

  let results = ResourceModel.getAll();

  if (search) {
    results = ResourceModel.findByTitle(search);
  }

  if (subject) {
    results = ResourceModel.findBySubject(subject);
  }

  res.json({ count: results.length, resources: results });
});

// ─────────────────────────────────────────
// GET /api/resources/:id
// Get a single resource by ID
// ─────────────────────────────────────────
router.get('/:id', (req, res) => {
  const resource = ResourceModel.findById(req.params.id);

  if (!resource) {
    return res.status(404).json({ message: 'Resource not found' });
  }

  res.json(resource);
});

// ─────────────────────────────────────────
// GET /api/resources/:id/download
// Download the actual file
// ─────────────────────────────────────────
router.get('/:id/download', (req, res) => {
  const resource = ResourceModel.findById(req.params.id);

  if (!resource) {
    return res.status(404).json({ message: 'Resource not found' });
  }

  const filePath = path.join(__dirname, '..', 'uploads', resource.filename);

  // res.download() sends the file as a download to the browser
  res.download(filePath, resource.originalName, (err) => {
    if (err) {
      res.status(500).json({ message: 'Error downloading file' });
    }
  });
});

module.exports = router;