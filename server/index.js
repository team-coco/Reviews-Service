require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
if (dotenv.error) console.log("No .env file found for config");
const controller = require('./controllers');
const app = express();
const port = process.env.PORT || 3004;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', express.static('./dist'));
app.use('/main/reviews', express.static('./dist'));
app.use('/main/reviews/ssr', express.static('./dist'));

// app.use(/\/main\/.*?\.jpg/, function (req, res) {
//   res.status(404);
//   res.end();
// });
app.get('/api/reviews/:id', controller.reviews.get);

//main route for serverside rendering returns [html, prerenderedStore] BOTH AS STRINGS
app.get('/main/reviews/:id', controller.reviews.ssr);

//fullpage of service SSR 
app.get('/main/reviews/ssr/:id', controller.reviews.ssrService);

app.listen(port, function(err) {
  console.log(`listening on port ${port}` );
  if (err) {
    console.log(err);
  }
});
