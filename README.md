# News-Scraper
Full-stack application that uses webscraping to allow users to gather up news articles, save them, and comment on them.

## [Give it a try!](https://centralized-news.herokuapp.com/ "News-Scraper at Heroku")
---
![News Scraper in action.](https://github.com/Mlipphardt/News-Scraper/blob/master/public/images/Demo-introduction.png "News Scraper in action.")

### How it works
---
Using the application online is as easy as clicking the "Scrape Articles" button! Articles can be cleared with the "Clear Articles" button. Each article can be saved, in which case it will be displayed upon clicking the "Favorites" link on the navigation bar. Clicking on "Notes" allows users to add comments to each article. If desired, these comments can be deleted by clicking on the red "x" in the corner of the comment. 

### Installing locally
---
By SSH

`git clone git@github.com:Mlipphardt/News-Scraper.git`

By HTTPS

`https://github.com/Mlipphardt/News-Scraper.git`

Node.js is required for the server and can be downloaded [here.](https://nodejs.org/en/download/ NodeJS download.)

Once installed, run "npm install" in the root folder in order to retrieve the required packages.

You will also need to install MongoDB from the [MongoDB website.](mongodb.com/download-center/community MongoDB download link)

Once installed, run the command "mongod" in your terminal in order to start the local MongoDB database. Then, 'node server' in the root folder in order to start the app. 

---
### The tech behind it
* JavaScript with Node.js for server code.
* Handlebars for html templating.
* MongoDB for NoSQL database to store articles and commented notes.
* Jquery for dynamic html updating.
* Cheerio and axios in order to scrape html.
* Mongoose for interacting with MongoDB.
