const db = require('../config/dummyDB');
const { v4: uuidv4 } = require('uuid'); // for generating unique IDs

const UserModel = {

  // Find a user by their email address
  findByEmail: (email) => {
    return db.users.find(user => user.email === email);
  },

  // Find a user by their ID
  findById: (id) => {
    return db.users.find(user => user.id === id);
  },

  // Create a new user and add to the database
  create: (name, email, hashedPassword) => {
    const newUser = {
      id: uuidv4(),       // generate a random unique ID
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };
    db.users.push(newUser);
    return newUser;
  }

};

module.exports = UserModel;