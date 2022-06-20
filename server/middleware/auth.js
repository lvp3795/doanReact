const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../error");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Chưa cung cấp token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userID: decoded.userID,
      name: decoded.name,
      role: decoded.role,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Không có quyền truy cập");
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthenticatedError("Không có quyền truy cập");
    }
    next();
  };
};

module.exports = { authenticationMiddleware, authorizeRoles };
