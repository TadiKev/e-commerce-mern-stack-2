const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { user: { id: user._id } }, // Payload
    'secret-ecom', // Secret key
    { expiresIn: '1h' } // Token expiry time
  );
};

module.exports = generateToken;
