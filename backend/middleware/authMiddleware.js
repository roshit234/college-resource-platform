const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  // Check if the request has an Authorization header with a Bearer token
  // It looks like: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI..."
  if (req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')) {

    try {
      // Extract just the token part (remove "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user's ID and name to the request object
      // so the next route can use it
      req.user = { id: decoded.id, name: decoded.name };

      // Move on to the actual route
      next();

    } catch (error) {
      res.status(401).json({ message: 'Not authorized, invalid token' });
    }

  } else {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };