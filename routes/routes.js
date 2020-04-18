const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const router = express.Router();
const db = require("../models");

router.get("/", function (req, res) {
  db.Article.find({})
    .lean()
    .then(function (dbArticle) {
      let allArticles = {
        articles: dbArticle,
      };
      res.render("index", allArticles);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/favorites", function (req, res) {
  db.Article.find({})
    .lean()
    .then(function (dbArticle) {
      let allArticles = {
        articles: dbArticle,
      };
      res.render("favorites", allArticles);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/api/articles", function (req, res) {
  db.Article.find({})
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/api/notes", function (req, res) {
  db.Note.find({})
    .then(function (dbNote) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.post("/api/notes", function (req, res) {
  db.Note.create(req.body)
    .then(function (dbNote) {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { notes: dbNote._id } },
        { new: true }
      );
    })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/scrapenews", function (req, res) {
  axios.get("https://www.npr.org/sections/news/").then(function (response) {
    let $ = cheerio.load(response.data);

    $("div.item-info").each(function (i, element) {
      let article = {};

      article.title = $(element).children("h2").children("a").text();
      article.link = $(element).children("h2").children("a").attr("href");
      article.description = $(element).children("p").text();

      db.Article.create(article)
        .then(function (dbArticle) {
          console.log(dbArticle);
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  });
});

router.put("/favorites/:id", function (req, res) {
  db.Article.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { favorite: req.body.favorite } },
    function (err, dbArticle) {
      if (err) {
        console.log(err);
      }
      console.log("Updated article!");
    }
  );
});

router.delete("/api/articles", function (req, res) {
  db.Article.deleteMany({}, function (err) {
    if (err) {
      console.log(err);
    }
  });
});

module.exports = router;
