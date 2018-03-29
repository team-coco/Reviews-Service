const dotenv = require('dotenv').config();
const request = require('request');
const cheerio = require('cheerio');
var models = process.env.DB_CHOICE === 'sql' ?  require('../models/sql.js'): require('../models/cassandra.js'); 
var ssr = require('../models/ssr.jsx');
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
          res.status(404);
          res.end();
        }); 
      }
    },
  ssrService: (req, res) => {
    models.get(req.params.id, req.query).then(data => {

      ssr.renderComponents(req.url, data).then((result) =>{
        res.send(ssr.renderFullpage(result[0], result[1]));
      }).catch((err) => {
        console.log('Something went wrong with SSR: ', err);
      })

    }).catch(err => {
      console.log('oh no db error', err);
      res.status(404);
      res.end();
    }); 
  },
  ssr: (req, res) => {
    models.get(req.params.id, req.query).then(data => {

      ssr.renderComponents(req.url, data).then((result) =>{
        res.send([result[0], JSON.stringify(result[1]).replace(/</g, '\\u003c')]);
      }).catch((err) => {
        console.log('Something went wrong with SSR: ', err);
      })

    }).catch(err => {
      console.log('oh no db error', err);
      res.status(404);
      res.end();
    }); 
    }
  }
};