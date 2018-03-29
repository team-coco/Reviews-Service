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
console.log(__dirname)
app.use('/', express.static('/Users/zhen/Code/Reviews-Service/dist'));

app.get('/reviews/reviews/:id', controller.reviews.get);

//main route for serverside rendering
app.get('/:id', controller.reviews.ssr);

// app.get('/:id', (req, res) => {
//   res.sendFile(path.join(__dirname + '/../dist/index.html'));
// });
app.listen(port, function() {
  console.log(`listening on port ${port}` );
});
