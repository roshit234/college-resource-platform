// This is our fake database.
// In real life, this would be MongoDB.
// Data lives in memory — it resets when you restart the server.

let users = [
  // Example user already in the "database" for testing
  // (we'll remove this later)
  // { id: '1', name: 'Test User', email: 'test@test.com', password: '...' }
];

let resources = [
  // Example resource for testing
  // { id: '1', title: 'Math Notes', subject: 'Maths', uploadedBy: '1', filename: 'math.pdf' }
];

module.exports = { users, resources };