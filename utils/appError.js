class AppError extends Error {
  constructor(statusCode, status, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
  }
}

export default AppError;

export const handleErrors = (err, res) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      status: false,
      message: err.message || "Something went wrong",
    });
  }

  if (err.code === 11000) {
    const duplicateKey = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      status: false,
      message: `${duplicateKey} already exists. Please use a unique value.`,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: false,
      message: Object.values(err.errors).map((val) => val.message)[0],
    });
  }

  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({
      status: false,
      message: `Invalid ${err.path}. Please provide a valid ID.`,
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: false,
      message: "Invalid token. Please log in again.",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      status: false,
      message: "Your session has expired. Please log in again.",
    });
  }

  if (err instanceof ReferenceError || err instanceof TypeError) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please contact support.",
    });
  }

  return res.status(500).json({
    status: false,
    message: "Server-side issue. Please try again later.",
  });
};
