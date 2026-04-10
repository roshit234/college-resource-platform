const db = require('../config/dummyDB');
const { v4: uuidv4 } = require('uuid');

const ResourceModel = {

  // Get all resources
  getAll: () => {
    return db.resources;
  },

  // Find resources by subject (case-insensitive search)
  findBySubject: (subject) => {
    return db.resources.filter(r =>
      r.subject.toLowerCase().includes(subject.toLowerCase())
    );
  },

  // Find resources by title keyword
  findByTitle: (keyword) => {
    return db.resources.filter(r =>
      r.title.toLowerCase().includes(keyword.toLowerCase())
    );
  },

  // Create a new resource
  create: (data) => {
    const newResource = {
      id: uuidv4(),
      title: data.title,
      subject: data.subject,
      description: data.description || '',
      filename: data.filename,       // the actual saved file name
      originalName: data.originalName, // original file name user uploaded
      uploadedBy: data.uploadedBy,   // user ID
      uploaderName: data.uploaderName,
      fileType: data.fileType,       // pdf, ppt, etc.
      uploadedAt: new Date()
    };
    db.resources.push(newResource);
    return newResource;
  },

  // Find a resource by ID
  findById: (id) => {
    return db.resources.find(r => r.id === id);
  }

};

module.exports = ResourceModel;