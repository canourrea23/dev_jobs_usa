const express = require("express");
const app = express();
require('dotenv').config()
const cheerio = require('cheerio');
const request = require('request');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const db = require("./models");
const SECRET_SESSION = process.env.SECRET_SESSION;
const isLoggedIn = require('./middleware/isLoggedIn');
console.log('SECRET_SESSION', SECRET_SESSION);

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
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

app.get('/profile',  (req, res) => {
    //console.log(res.locals.alerts);
    res.render('profile');
  });
  app.get('/:city', async (req, res) => {
    const city = req.params.city[0].toUpperCase() + req.params.city.slice(1).toLowerCase();
    console.log('CITY',city);
    // const { currency = 'CAD' } = req.query;
    console.log(req.query);
    fetch(`https://www.numbeo.com/cost-of-living/in/${city}`, (error, meta, body) => {
      let html = body.toString();
      const $ = cheerio.load(html);

      const priceRows = $('body > div.innerWidth > table.data_wide_table.new_bar_table > tbody > tr > td.priceValue > span.first_currency').text().split;
      
      console.log(priceRows);

    })
});


// app.get('/city/:city', (req, res, params) => {
//    let city = req.params.city 
//   console.log(city) 
  
// const requestObject = {
//     method: 'GET',
//     url: `https://www.numbeo.com/cost-of-living/in/${city}`
//   };
//   request(requestObject, (err, res, body) => {
//     if (err) return console.error(err);
//     let $ = cheerio.load(body);
//     let title = $('tr').attr('class', 'first_currency');
//     let milkPrice = Number($('.first_currency').find('span').text().split('\n')[10].split('$')[0]); 
//     console.log(milkPrice);                                                                   
//     let gasPrice = Number($('.first_currency').find('span').text().split('\n')[35].split('--')[1].slice(5).split('$')[0]);
//     let publicTransit = Number($('.first_currency').find('span').text().split('\n')[31].split('--')[1].slice(4).split('$')[0]);
//     let utilitiesPrice = Number($('.first_currency').find('span').text().split('\n')[39].split('$')[0]);
//     let internetPrice = Number($('.first_currency').find('span').text().split('\n')[41].split('--')[1].slice(4).split('$')[0]);
//     let childCarePrice = $('.first_currency').find('span').text().split('\n')[47].split(' ')[0].split('$')[0];
//     let childCarePriceParsed = Number(childCarePrice.split(',')[0] + childCarePrice.split(',')[1]);
//     const arrayOfData = $('.first_currency').find('span').text().split('\n')
//     let centre = Number(arrayOfData[55].split('$')[0].split(',')[0] + arrayOfData[55].split('$')[0].split(',')[1]);    
//     let outOfCity = Number(arrayOfData[56].split('$')[0].split(',')[2][arrayOfData[56].split('$')[0].split(',')[2].length -1] + arrayOfData[56].split('$')[0].split(',')[3]);   
//     let averageMeal = Number($('.first_currency').find('span').text().split('\n')[1].split('$')[0]);
//       const locationObject = { 
//           bedroom_in_city: Math.round(centre),
//           bedroom_outside_centre: Math.round(outOfCity),
//           public_transit: Math.round(publicTransit),
//           internet: Math.round(internetPrice),
//           childcare:  Math.round(childCarePriceParsed),
//           gas: Math.round(gasPrice * 3.785),
//           average_meal: Math.round(averageMeal),
//           milk: Math.round(milkPrice * 3.785),
//           utilities: Math.round(utilitiesPrice),
//       }
//       console.log(locationObject);
//       // console.log(Math.round(locationObject.bedroom_in_city));
      
//       db.location.create(locationObject)
//       .then((newLocation) => {
//         console.log(newLocation.get());
        
//         res.render('city', { city, newLocation });
//       })
//   });
// });
//
const PORT = process.env.PORT || 3000;

app.get("/thing", (req, res) => res.send("Connected")); 

const server = app.listen(PORT, () => {
  console.log(`You are connected ${PORT} 🎧`);
});

module.exports = server;
