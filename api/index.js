require("dotenv/config");
const express = require("express");
const app = express();
const routes = require("../routes");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3000);

console.log(`App runs on port ${process.env.PORT || 3000}`);
