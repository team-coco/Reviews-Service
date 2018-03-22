const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const controller = require('./controllers');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
if (dotenv.error) console.log("No .env file found for config");
const app = express();
const port = process.env.PORT || 3004;

//app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../dist'));

app.get('/reviews/reviews/:id', controller.reviews.get);
//app.get('/reviews/user/:id', controller.user.get);
app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
});
app.listen(port, function() {
  console.log(`listening on port ${port}` );
});
