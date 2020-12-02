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
  const Washington = {
    method: 'GET',
    url: 'https://www.numbeo.com/cost-of-living/in/Washington'
  };
//   request(Washington, (err, res, body) => {
//       if (err) return console.error(err);
//       let $ = cheerio.load(body);
//       let title = $('tr').attr('class', 'first_currency');
//       // console.log(title.text());
//       let milk = $('.first_currency').find('span').text().split('\n')[10];
//       let priceOfMilk = Number(milk);
//       console.log(milk);
//       console.log(priceOfMilk);
//   });

const LosAngeles = {
    method: 'GET',
    url: 'https://www.numbeo.com/cost-of-living/in/Los-Angeles'
  };
  request(LosAngeles, (err, res, body) => {
      if (err) return console.error(err);
      let $ = cheerio.load(body);
      let title = $('tr').attr('class', 'first_currency');
      // console.log(title.text());
      let milkPrice = Number($('.first_currency').find('span').text().split('\n')[10].split('$')[0]);                                                                    
      let gasPrice = Number($('.first_currency').find('span').text().split('\n')[35].split('--')[1].slice(5).split('$')[0]);
      let publicTransit = Number($('.first_currency').find('span').text().split('\n')[31].split('--')[1].slice(4).split('$')[0]);
      let utilitiesPrice = Number($('.first_currency').find('span').text().split('\n')[39].split('$')[0]);
      let internetPrice = Number($('.first_currency').find('span').text().split('\n')[41].split('--')[1].slice(4).split('$')[0]);
      let childCare = Number($('.first_currency').find('span').text().split('\n')[47].split('$')[0]);
      let centerCity = Number($('.first_currency').find('span').text().split('\n')[55].split('$')[0]);
    //   console.log(milkPrice);
    //   console.log(gasPrice);
    //   console.log(publicTransit);
    //   console.log(utilitiesPrice);
    //   console.log(internetPrice);
      console.log(childCare);
      //console.log(centerCity);
      
  });
//
const PORT = process.env.PORT || 8000;

app.get("/thing", (req, res) => res.send("Connected")); 

const server = app.listen(PORT, () => {
  console.log(`You are connected ${PORT} 🎧`);
});

module.exports = server;
