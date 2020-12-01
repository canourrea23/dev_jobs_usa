const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { google } = require("googleapis");
const request = require("request");
const cors = require("cors");
const urlParse = require("url-parse");
const queryParse = require("query-string");


app.get("/thing", (req, res) => res.send("Connected"));

const server = app.listen(PORT, () => {
  console.log(`You are connected ${PORT} 🎧`);
});

module.exports = server;
