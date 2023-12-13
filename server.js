require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});
require("./services/socket.service")(io);

let corsOptions = {
    origin:
        process.env.NODE_ENV === "production"
            ? "*"
            : [
                  "http://127.0.0.1:3030",
                  "http://localhost:3030",
                  "http://localhost:3000",
                  "http://localhost:4000",
                  "http://localhost:5173",
                  "http://127.0.0.1:5173",
              ],
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json()); // handle with put requests

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "public")));
}

const paintingRoutes = require("./api/painting/painting.routes");
const departureRoutes = require("./api/departure/departure.routes");

app.use("/api/painting", paintingRoutes);
app.use("/api/departure", departureRoutes);

const port = process.env.PORT || 3030;
http.listen(port, () => {
    console.log("Server is running on port: ", port);
});
