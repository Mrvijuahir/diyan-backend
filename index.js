require("dotenv").config();
const fs = require("fs");
const path = require("path");

// Express App
const express = require("express");
const app = express();

// Initialize Middlewares
app.use(express.json()); // parse JSON data in request body
app.use(express.urlencoded({ extended: true })); // parse URL-encoded data in request body

// cors configurations
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000"], // Add your front-end origins
  })
);

// morgan configurations to print api request logs
const morgan = require("morgan");
// Print api request log into terminal.
// here we are used dev format to print logs into terminal because it's print quick overview about user request with colorful output
app.use(morgan("dev"));
// Add api request logs into log file.
// here we are used combined format to add as much as possible details of user request into log file
app.use(
  morgan("combined", {
    stream: fs.createWriteStream(path.join(__dirname, "logs/api_request.log"), {
      flags: "a",
    }),
  })
);

// winston configuration to store api error logs into file
const { logAPICalls, errorHandler } = require("./middlewares/winston");
app.use(logAPICalls);

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

// winston configuration to store error logs into file and send response to the users
app.use(errorHandler);

// Start server to listen user request on your port
server.listen(PORT, () => {
  console.log(
    `Server is start listing on port: ${PORT}. Visit http://localhost:${PORT}`
  );
});
