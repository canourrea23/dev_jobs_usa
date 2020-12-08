require('dotenv').config();
const express = require("express");
const sequelize = require("sequelize")
const cheerio = require('cheerio');
const request = require('request');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const fetch = require('fetch').fetchUrl;
const db = require("./models");
const router = express.Router();
const methodOverride = require('method-override');


const SECRET_SESSION = process.env.SECRET_SESSION;

const app = express();
const isLoggedIn = require('./middleware/isLoggedIn');
const users = require('./models/user');

console.log('SECRET_SESSION', SECRET_SESSION);

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'))
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

// app.put("/profile", (req, res) => {
//   db.user.findOne({
//     where: {
//       id: req.user.id,
//     }
//   })
//   .then((user) => {
//     user.favoriteCity = req.body.favorite
//     user.save().then((city) => {
//       res.redirect('fave')
//     })
//   })
// });
app.post('/fave', (req, res) =>{
  
  console.log('hello', req);
})
// app.put('fave', (req, res) => {
//   db.user.FindOrCreate(user.id)
//   .then(favoriteCity => {
//     res.render('city', {
//       favoriteCity: sequelize.DataTypes.get(),
//       city,
//     });
//   });
// })

app.get('/', (req, res) => {
  console.log(res.locals.alerts);
  res.render('index', { alerts: res.locals.alerts });
});

app.get('/profile', (req, res) => {
  res.render('profile');
})

app.get('/fave', (req, res) => {
  res.render('fave');
})

app.get('/city',  (req, res) => {
    //console.log(res.locals.alerts);
    res.render('city');
});

app.get('/:city', async (req, res) => {
  const city = req.params.city[0].toUpperCase() + req.params.city.slice(1).toLowerCase();
  console.log('CITY',city);
  fetch(`https://www.numbeo.com/cost-of-living/in/${city}`, (error, meta, body) => {
    let html = body.toString();
    console.log(body);
    const $ = cheerio.load(html);
    const priceRows = String($('body > div.innerWidth > table.data_wide_table.new_bar_table > tbody > tr > td.priceValue > span.first_currency').text().split(' ')[0]).split('$');
    console.log(priceRows);

    const parsedPriceRows = priceRows.map(element => {
      if (element.includes(',')) {
        let newPrice = Math.round(Number(element.replace(',', '')));
        return newPrice;
      } else {
        let newPrice = Math.round(Number(element));
        return newPrice;
      }
    });   // console.log(parsedPriceRows[48])
    const locationObject = { 
      bedroom_in_city: parsedPriceRows[47],
      bedroom_outside_centre: parsedPriceRows[48],
      public_transit: parsedPriceRows[28],
      internet: parsedPriceRows[37],
      childcare: parsedPriceRows[41],
      gas: (Math.round(parsedPriceRows[32])),
      average_meal: parsedPriceRows[0],
      milk: (Math.round(parsedPriceRows[8])),
      utilities: parsedPriceRows[35]
    };    
    db.location.create(locationObject)
    .then(newLocation => {
      res.render('city', {
        newLocation: newLocation.get(),
        city,
      });
    });
  });
});

app.use('/auth', require('./routes/auth'));



// app.post('/city', function(req, res) {
//   console.log(req.body.name);
//   db.newLocation.findOrCreate({
//     where: {
//       name: req.body.name,
//       city: req.body.newLocation
//     }
//   }).then(() => {
//     res.redirect('fave');
//   })
// });

const PORT = process.env.PORT || 8000;

app.use((req, res) => {
  res.status(404).render('404')
}), 

app.get("/thing", (req, res) => res.send("Connected")); 

const server = app.listen(PORT, () => {
  console.log(`You are connected ${PORT} 🎧`);
});

module.exports = server;
