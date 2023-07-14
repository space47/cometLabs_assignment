const jwt = require("jsonwebtoken");
const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const User = require('../models/User')

const authenticateUser = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  // console.log('Came in middleware='+req.headers.authorization)

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId).select('-password')
    payload.role = user.role
    const { userId, name, role } = payload;
    console.log("In authentication" + { payload });
    req.user = { userId, name, role };
    console.log(req.user)
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

const authorizePermission = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError(
        "Unauthorized to Access this page"
      );
    }
    // return a callback to express if role not present in array then log an error otherwise go to next call, here it is getAllUser function
    next();
  };
};

module.exports = {authenticateUser, authorizePermission};
