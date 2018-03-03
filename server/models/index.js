var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  business: {
    get: id => {
      return new Promise((resolve, reject) => {
        var query = `select name from business where id='${id}'`;
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            // console.log(result[0]);
            resolve(result);
          }
        });
      });
    }
  },
  reviews: {
    get: (id, params) => {
      return new Promise((resolve, reject) => {
        if (params.q) {
          console.log(params.q);
        }
        var query = `select review.stars, review.date, review.text,
        review.useful, review.funny, review.cool, user.id as user_id, user.name as user_name,
        user.review_count as user_reviewcount, user.yelping_since as user_yelping_since,
        user.useful as user_useful, user.funny as user_funny, user.cool as user_cool,
        user.fans as user_fans, user.average_stars as user_average_stars, user.pic as user_pic
        from review inner join user on review.user_id=user.id where business_id='${id}' limit 20`;
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }
  },
  userpic: {
    save: (id, url) => {
      return new Promise((resolve, reject) => {
        var query = `update user set pic='${url}' where id='${id}'`;
        db.query(query, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  }
};