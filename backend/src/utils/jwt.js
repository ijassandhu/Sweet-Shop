const jwt = require("jsonwebtoken");

const SECRET = "supersecretkey"; // You can move this to .env later

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, {
    expiresIn: "1d",
  });
}

module.exports = { generateToken, SECRET };
