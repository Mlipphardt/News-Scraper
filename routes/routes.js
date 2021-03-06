const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const router = express.Router();
const db = require("../models");

//Home route, renders with Handlebars and passes article array.
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

//Get all favorited articles.
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

//View all articles.
router.get("/api/articles", function (req, res) {
  db.Article.find({})
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

//Get a single article by id and populate it with its notes.
router.get("/api/article/:id", function (req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

//Get all notes
router.get("/api/notes", function (req, res) {
  db.Note.find({})
    .then(function (dbNote) {
      res.json(dbNote);
    })
    .catch(function (err) {
      res.json(err);
    });
});

//Post a note. When posted, add to note array in corresponding article.
router.post("/api/notes/:id", function (req, res) {
  db.Note.create(req.body)
    .then(function (dbNote) {
      console.log("Posting note...");
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { note: dbNote._id } },
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

//Scrapes news from NPR website.
router.get("/scrapenews", function (req, res) {
  axios.get("https://www.npr.org/sections/news/").then(function (response) {
    console.log(response.data);
    let $ = cheerio.load(response.data);
    $("div.item-info").each(function (i, element) {
      let article = {};

      article.title = $(element).children("h2").children("a").text();
      article.link = $(element).children("h2").children("a").attr("href");
      article.description = $(element).children("p").text();

      db.Article.create(article)
        .then(function (dbArticle) {
          res.json(dbArticle);
        })
        .catch(function (err) {
          res.json(err);
        });
    });
  });
});

router.get("/scrapenyt", function (req, res) {
  axios.get("https://www.nytimes.com/section/world").then(function (response) {
    let $ = cheerio.load(response.data);
    console.log("Cheerio should be loaded");
    $("article").each(function (i, element) {
      console.log("hi");
      let article = {};

      article.title = $(element)
        .children("div")
        .children("h2")
        .children("a")
        .text();
      article.link = $(element)
        .children("div")
        .children("h2")
        .children("a")
        .attr("href");

      article.description = $(element).children("div").children("p").text();
      console.log(article);

      db.Article.create(article)
        .then(function (dbArticle) {
          res.json(dbArticle);
        })
        .catch(function (err) {
          res.json(err);
        });
    });
  });
});

router.get("/scrapefox", function (req, res) {
  axios.get("https://www.foxnews.com/").then(function (response) {
    let $ = cheerio.load(response.data);
    console.log("Cheerio should be loaded");
    $("article").each(function (i, element) {
      let article = {};

      article.title = $(element)
        .children("div.info")
        .children("header")
        .children("h2")
        .children("a")
        .text();
      article.link = $(element)
        .children("div.info")
        .children("header")
        .children("h2")
        .children("a")
        .attr("href");
      article.description = article.title;
      console.log(article);

      db.Article.create(article)
        .then(function (dbArticle) {
          res.json(dbArticle);
        })
        .catch(function (err) {
          res.json(err);
        });
    });
  });
});

//Updates an article as favorited or unfavorited.
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

//Clears all articles from the collection.
router.delete("/api/articles", function (req, res) {
  db.Article.deleteMany({}).then(function (dbArticle) {
    res.json(dbArticle);
  });
});

//Deletes note by ID, and then removes its reference from its article
router.delete("/api/note/:id", function (req, res) {
  db.Note.findOneAndDelete({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    }
    db.Article.findOneAndUpdate(
      { notes: req.params.id },
      { $pull: { notes: req.params.id } },
      function (dbArticle, err) {
        if (err) {
          console.log(err);
        }
      }
    );
  }).then(function (dbNote) {
    console.log("deleted");
    res.json(dbNote);
  });
});

module.exports = router;
