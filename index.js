import mongoose from "mongoose";
const { connect } = mongoose;
import { config } from "dotenv";
import http from "http";
import jwt from "jsonwebtoken";
import express, { json } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import { Server } from "socket.io";
import cronSchedule from "./controllers/cronScheduler.js";
import cors from "./corsConfig.js";
import indexRoutes from "./routes/indexRoutes.js";
import { setIOInstance } from "./constants/socketStore.js"; 


// Load environment variables
config({ path: "./.env" });

// Check required environment variabless
if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  console.error("Environment variables DATABASE Credentials are required.");
  process.exit(1);
}

const app = express();
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
  cors: { origin: "*" },
});

setIOInstance(io);

// Connect to MongoDB
const database = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
connect(database)
  .then(() => console.log("DB connection Successfully!!!"))
  .catch((err) => {
    console.error("DB connection error:", err.message);
    process.exit(1);
  });

// Start the server
const port = process.env.PORT || 7000;
server.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});

// Handle process errors
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION!!!!! shutting down ......", err.message);
  server.close(() => process.exit(1));
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully.");
  mongoose.connection.close(() => {
    console.log("Mongoose connection closed.");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully.");
  mongoose.connection.close(() => {
    console.log("Mongoose connection closed.");
    process.exit(0);
  });
});

app.use(cors);

// app.use(cors({
//   origin: 'http://liveez-qa.com.s3-website.ap-south-1.amazonaws.com',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));


// Set security HTTP headers
app.use(helmet());

// Limit request from the same API
const limiter = rateLimit({
  max: 150000,
  windowMs: 60 * 60 * 1000,
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false, // Disable the X-RateLimit-* headers
  message: "Too Many Request from this IP, please try again in an hour",
});

app.use("/api", limiter);

// Trust proxy header
app.set("trust proxy", 1); // Replace '1' with 'true' if behind multiple proxies

// Body parser, reading data from body into req.body
app.use(
  json({
    limit: "25MB",
  })
);

// Data sanitization against No sql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.json({ message: "Welcome to Liveez developemnt applications." });
});

app.get("/demo-api", (req, res) => {
  res.json({ message: "Welcome to Apartmet application." });
});

app.get("/qa-api", (req, res) => {
  res.json({ message: "Welcome to Liveez qa test this application @@.***" });
});

app.use("/api/v1", indexRoutes);

cronSchedule();

export default app;
