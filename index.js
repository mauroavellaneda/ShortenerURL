const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./router");
const bodyParser = require("body-parser");

require("dotenv").config({ path: "var.env" });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "./views"));

app.use(express.static("public"));

app.use("/", routes());

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5000

app.listen(port, host, () => {
  console.log("app is working")
});
