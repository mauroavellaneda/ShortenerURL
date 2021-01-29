const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./router");
const bodyParser = require("body-parser");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/URLShortener", {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "./views"));

app.use(express.static("public"));

app.use("/", routes());

app.listen(5000);
