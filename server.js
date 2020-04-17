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

mongoose.connect("mongodb://localhost/news_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

var routes = require("./routes/routes");

app.use(routes);

app.listen(PORT, function () {
  console.log("Sever live and listening on PORT " + PORT + "!");
});
