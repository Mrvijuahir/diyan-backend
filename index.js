require("dotenv").config();

// Express App
const express = require("express");
const app = express();

// Initialize Middlewares

// cors configurations
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000"], // Add your front-end origins
  })
);

// morgan configurations to print api request logs
const morgan = require("morgan");
app.use(morgan("dev"));

// Socket io configurations
const server = require("http").createServer(app);
const io = require("socket.io")(server);
global.io = io;

// Variables
const PORT = process.env.PORT;

// import routes
app.use("/api", require("./routes"));

// Default route
app.get("/", (req, res) => {
  res.status(200).send(`<h1>Welcome to node-express-starter project</h1>`);
});

// default middleware to handle errors
app.use((error, req, res, next) => {
  console.log("error", error);
  res.status(422).json({
    status: false,
    message:
      error?.message ||
      "Something went wrong! Please try again after sometime.",
  });
});

// Start server to listen user request on your port
server.listen(PORT, () => {
  console.log(
    `Server is start listing on port: ${PORT}. Visit http://localhost:${PORT}`
  );
});
