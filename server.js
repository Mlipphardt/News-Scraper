var express = require("express");
var axios = require("axios");
const mongoose = require("mongoose");
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news_db";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

var routes = require("./routes/routes");

app.use(routes);

app.listen(PORT, function () {
  console.log("Sever live and listening on PORT " + PORT + "!");
});
