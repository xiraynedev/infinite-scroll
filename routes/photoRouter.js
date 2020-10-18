if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const request = require('request');

const ACCESS_KEY = process.env.ACCESS_KEY

/* GET home page. */
router.post('/', function(req, res, next) {
  const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&count=${req.body.imageCount}`
  // Make a fetch request to the API
  request.get(apiUrl, (error, response, apiData) => {
    res.send(apiData);
  });
});

module.exports = router;

