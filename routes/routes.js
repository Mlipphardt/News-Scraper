const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const router = express.Router();

router.get("/", function (req, res) {
  let placeholder = { test: "Testing!" };
  res.render("index", placeholder);
});

router.get("/scrapenews", function (req, res) {
  axios.get("https://www.npr.org/sections/news/").then(function (response) {
    let $ = cheerio.load(response.data);

    $("div.item-info").each(function (i, element) {
      let article = {};

      article.title = $(element).children("h2").children("a").text();
      article.link = $(element).children("h2").children("a").attr("href");
      article.description = $(element).children("p").text();

      console.log(article);
    });
  });
});

module.exports = router;
