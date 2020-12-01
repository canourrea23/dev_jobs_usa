const express = require("express");
const app = express();
const cheerio = require('cheerio');
const request = require('request');

request({
    method: 'GET',
    url: 'https://www.numbeo.com/cost-of-living/'
}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);

    let title = $('title');

    console.log(title.text());
});
const PORT = process.env.PORT || 3000;

app.get("/thing", (req, res) => res.send("Connected"));

const server = app.listen(PORT, () => {
  console.log(`You are connected ${PORT} 🎧`);
});

module.exports = server;
