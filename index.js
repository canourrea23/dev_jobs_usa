const express = require("express");
const app = express();
const cheerio = require('cheerio');
const request = require('request');
const puppeteer = require('puppeteer');

// async function scrapeProduct(url) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);

//     const [el] = await page.$x('/html/body/div[2]/table/tbody/tr[11]/td[2]/span');
    
//     const text = await el.getProperties('textContent');
    
//     const rawText = await text.jsonValue();
    
//     console.log({srcText});
//     browser.close();
// }
// scrapeProduct('https://www.numbeo.com/cost-of-living/in/Washington');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
//app.use(layouts);

app.get('/', (req, res) => {
    console.log(res.locals.alerts);
    res.render('index', { alerts: res.locals.alerts });
  });

//   request('https://www.numbeo.com/cost-of-living/in/Washington', (error, response, body) => {
//     let $ = cheerio.load(body);
//     let results = $('.search-result-preview')
//     let resultTitles = results.map((index, element)=>{
//         return $(element).find('<td>Meal, Inexpensive Restaurant </td>').attr('meal')
        
//     })
//     console.log(resultTitles)
// })

request({
    method: 'GET',
    url: 'https://www.numbeo.com/cost-of-living/in/Los-Angeles'
}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);
    

    let title = $('tr').attr('class', 'first_currency');
    console.log(title.text());
});

const PORT = process.env.PORT || 3000;

app.get("/thing", (req, res) => res.send("Connected"));

const server = app.listen(PORT, () => {
  console.log(`You are connected ${PORT} 🎧`);
});

module.exports = server;
