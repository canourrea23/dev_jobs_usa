const express = require("express");
const app = express();
const cheerio = require('cheerio');
const request = require('request');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
//app.use(layouts);

app.get('/', (req, res) => {
    console.log(res.locals.alerts);
    res.render('index', { alerts: res.locals.alerts });
  });

  request('https://www.numbeo.com/cost-of-living/in/Washington', (error, response, body) => {
    let $ = cheerio.load(body);
    let results = $('.search-result-preview')
    let resultTitles = results.map((index, element)=>{
        return $(element).find('td').attr('Meal, Inexpensive Restaurant')
    })
    console.log(resultTitles)
})

// request({
//     method: 'GET',
//     url: 'https://www.numbeo.com/cost-of-living/'
// }, (err, res, body) => {

//     if (err) return console.error(err);

//     let $ = cheerio.load(body);

//     let title = $('title');

//     console.log(title.text());
// });
const PORT = process.env.PORT || 3000;

app.get("/thing", (req, res) => res.send("Connected"));

const server = app.listen(PORT, () => {
  console.log(`You are connected ${PORT} 🎧`);
});

module.exports = server;
