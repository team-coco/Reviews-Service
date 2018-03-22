const dotenv = require('dotenv').config();
var request = require('request');
var cheerio = require('cheerio');
var models = process.env.DB_CHOICE === 'sql' ?  require('../models/sql.js'): require('../models/cassandra.js'); 
var DB_CHOICE = process.env.DB_CHOICE;

module.exports = {
  reviews: {
    get: (req, res) => {
      if (DB_CHOICE === 'sql') {
        models.business.get(req.params.id).then(name => {
          models.reviews.get(req.params.id, req.query).then(data => {
            //console.log({...name[0], pages: data.pages, reviews: data.reviews});
            res.json({...name[0], pages: data.pages, reviews: data.reviews});
          });
        }).catch(err => {
          console.log('oh no db error', err);
          res.end();
        }); 
      } else {
        models.get(req.params.id, req.query).then(data => {

          res.json({name: data.name, pages: data.pages, reviews: data.reviews});
        
        }).catch(err => {
          console.log('oh no db error', err);
          res.end();
        }); 
      }
    }
  }
  // user: {
  //   get: (req, res) => {
  //     var url = `https://www.yelp.com/user_details?userid=${req.params.id}`;
  //     request(url, (error, response, html) => {
  //       if(!error){
  //         var $ = cheerio.load(html);
  //         var userPicUrl = $('.photo-slideshow_slide.is-active');
  //         // console.log(userPicUrl);
  //         if (userPicUrl) {
  //           userPicUrl = userPicUrl.css('background-image');
  //           if (userPicUrl.length) {
  //             userPicUrl = userPicUrl.substr(4, userPicUrl.length - 5);
  //             models.userpic.save(req.params.id, userPicUrl).then(err => {
  //               if (err) {
  //                 console.log('error saving');
  //               } else {
  //                 console.log('saved url succesfully');
  //               }
  //             });
  //           }
  //           res.json({url: userPicUrl});
  //         } else {
  //           res.end();
  //         }
  //       } else {
  //         console.log(error);
  //         res.end();
  //       }
  //     });
  //   }
  // }
};