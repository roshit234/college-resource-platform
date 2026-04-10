# 🎓 College Resource Sharing Platform

A full-stack web application where students can upload and download
academic resources like notes, PDFs, and presentations.

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (dummy DB for development)
- **Auth:** JWT (JSON Web Tokens)
- **File Upload:** Multer

## ✨ Features
- User signup and login with JWT authentication
- Upload academic resources (PDF, PPT, DOC)
- Browse and download resources
- Search by title or subject
- Protected routes (only logged-in users can upload)

## 🚀 Run Locally

### 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/college-resource-platform.git
cd college-resource-platform/backend

### 2. Install dependencies
npm install

### 3. Create .env file
Create a file called .env inside backend/ with:
PORT=5000
JWT_SECRET=yoursecretkey

### 4. Start the server
npm run dev

### 5. Open the frontend
Open frontend/index.html in your browser

## 📁 Project Structure
college-resource-platform/
├── backend/
│   ├── config/        → Database config
│   ├── models/        → Data models
│   ├── routes/        → API routes
│   ├── middleware/    → Auth middleware
│   ├── uploads/       → Uploaded files
│   └── server.js      → Entry point
└── frontend/
    ├── index.html     → Home page
    ├── login.html     → Login page
    ├── signup.html    → Signup page
    ├── upload.html    → Upload page
    └── style.css      → Styles

## 👨‍💻 Author
Your Name — B.Tech CSE, 2nd Year