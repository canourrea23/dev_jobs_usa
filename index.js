const express = require("express");
const app = express();
const cheerio = require('cheerio');
const request = require('request');
const puppeteer = require('puppeteer');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const SECRET_SESSION = process.env.SECRET_SESSION;

// scrapeProduct('https://www.numbeo.com/cost-of-living/in/Washington');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
//app.use(layouts);
const sessionObject = {
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true
  }
  
  app.use(session(sessionObject));
  
  // Initialize passport and run through middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Flash
  // Using flash throughout app to send temp messages to user
  app.use(flash());
  
  // Messages that will be accessible to every view
  app.use((req, res, next) => {
    // Before every route, we will attach a user to res.local
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
  });

app.get('/', (req, res) => {
    console.log(res.locals.alerts);
    res.render('index', { alerts: res.locals.alerts });
  });
//   const website = {
//     method: 'GET',
//     url: 'https://www.numbeo.com/cost-of-living/in/Washington'
//   };
//   request(website, (err, res, body) => {
//       if (err) return console.error(err);
//       let $ = cheerio.load(body);
//       let title = $('tr').attr('class', 'first_currency');
//       // console.log(title.text());
//       let milk = $('.first_currency').find('span').text().split('\n')[10];
//       console.log(milk);
//   });
//   request('https://www.numbeo.com/cost-of-living/in/Washington', (error, response, body) => {
//     let $ = cheerio.load(body);
//     let results = $('.search-result-preview')
//     let resultTitles = results.map((index, element)=>{
//         return $(element).find('<td>Meal, Inexpensive Restaurant </td>').attr('meal')
        
//     })
//     console.log(resultTitles)
// })

const website = {
    method: 'GET',
    url: 'https://www.numbeo.com/cost-of-living/in/Los-Angeles'
  };
  request(website, (err, res, body) => {
      if (err) return console.error(err);
      let $ = cheerio.load(body);
      let title = $('tr').attr('class', 'first_currency');
      // console.log(title.text());
      let milk = $('.first_currency').find('span').text().split('\n')[10];
      console.log(milk);
  });

const PORT = process.env.PORT || 8000;

app.get("/thing", (req, res) => res.send("Connected")); 

const server = app.listen(PORT, () => {
  console.log(`You are connected ${PORT} 🎧`);
});

module.exports = server;



// const list = $('table[class="data_wide_table new_bar_table"]')
// .find('tbody > tr > td > span[class="first_currenecy"]')
// .toArray()
// .map(element => $(element).textContent);
// console.log(list);