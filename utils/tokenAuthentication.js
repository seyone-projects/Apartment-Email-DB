import jwt from "jsonwebtoken";
import User from "../models/userModal.js";
import {
  ADMIN,
  SUPER_ADMIN,
  BUILDER,
  OWNER,
  MC,
  EC,
} from "../constants/roles.js";

const config = process.env;

export async function verifyToken(req, res, next) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .json({ status: false, message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ status: false, message: "Unauthorized: Invalid token" });
      }

      const userData = await User.findOne({
        _id: decoded.id,
        sessionToken: token,
      });
      if (!userData) {
        return res
          .status(403)
          .json({ status: false, message: "User not found" });
      }

      req.userId = decoded.id;
      req.userData = userData;
      next();
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
}

export const verifyAllToken = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({
      status: false,
      message: "A token is required for authentication",
    });
  }
  token = token.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, config.JWT_SECRET);
    const userData = await User.findOne({ _id: decoded.id });

    if (!userData) {
      return res.status(403).json({ status: false, message: "User not found" });
    }

    if (!userData.sessionToken) {
      return res.status(401).json({
        status: false,
        message: "Invalid token",
      });
    }

    req.decodeToken = decoded;
    req.userId = decoded.id;
    req.userData = userData;
    req.role = userData?.role;

    req.isEcMc =
      userData?.role === OWNER &&
      (userData?.loginAs === "MC" || userData?.loginAs === "EC");

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: false,
        message: "Token has expired",
      });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: false,
        message: "Invalid token",
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "An error occurred while verifying the token",
        error: err.message,
      });
    }
  }
};

export const decodeToken = async (token) => {
  if (!token) {
    return false;
  }
  token = token.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, config.JWT_SECRET);
    return decoded;
  } catch (err) {}
};

export const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (req.isEcMc) {
      return next();
    }
    if (!req.role || !allowedRoles.includes(req.role)) {
      return res.status(403).json({
        status: false,
        message: "Access denied. Insufficient permissions.",
      });
    }
    next();
  };
};

export const verifyStaticToken = async (req, res, next) => {
  let token = req.headers["static_token"];
  if (!token) {
    return res.status(403).json({
      status: false,
      message: "A token is required for authentication",
    });
  }
  token = token.split(" ")[1];
  try {
    if (!token === process.env.STATIC_TOKEN) {
      return res.status(403).json({
        status: false,
        message: "A token is required for authentication",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "An error occurred while verifying the token",
      error: err.message,
    });
  }
};

export const onlyAdmin = async (req, res, next) => {
  var userData = req.userData;
  if (!userData) {
    return res.status(403).json({
      status: false,
      message: "A token is required for authentication",
    });
  }
  try {
    if (userData.loginAs != ADMIN) {
      return res
        .status(403)
        .json({ status: false, message: "Invalid user role" });
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
export const onlyBuilder = async (req, res, next) => {
  var userData = req.userData;
  if (!userData) {
    return res.status(403).json({
      status: false,
      message: "A token is required for authentication",
    });
  }
  try {
    if (userData.loginAs != BUILDER) {
      return res
        .status(403)
        .json({ status: false, message: "Invalid user role" });
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
