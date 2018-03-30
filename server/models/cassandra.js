var db = require('../db');
var Promise = require('bluebird');
var fs = require('fs');
var parse = require('csv-parse');

//to change no ids to biz ids
var bizIdToIterator;
fs.readFile('load_testing/constrainedBizId.csv', function (err, data) {
  if (err) throw err;
  parse(data, function(err, rows) {
    if (err) throw err;
    bizIdToIterator = rows;
    console.log('Iterators in mem');
  })
})

module.exports = {
  get: (id, params) => {
    return new Promise((resolve, reject) => {
      var iterator = (id % (bizIdToIterator.length - 1)) + 1;
      var business_id = bizIdToIterator[iterator][0];
      
      //console.log(params);
      var query = `SELECT business_name, stars, date, text,
      useful, funny, cool, user_id, user_name,
      review_count as user_reviewcount, yelping_since as user_yelping_since,
      user_useful, user_funny, user_cool,
      user_fans, average_stars as user_average_stars, tag as user_pic
      FROM oneTable 
      WHERE business_id = ? `;
      query += 'ORDER BY useful desc, date desc';
     
      // if enabled can imporve from 895.5 to 1000+
      if (!params.sort_by) {
        query += ' limit 5';
      }

      // if (params.q) {
      //   query = `select * from (` + query + `) as reviews where reviews.text like '%${params.q}%'`
      // }
      db.execute(query, [business_id], { prepare: true }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          var rows = result.rows;
          var pages = Math.ceil(rows.length / 20);
          var reviews = rows.slice();


          if (params.sort_by) {
            reviews.sort(function(a , b) {
              switch (params.sort_by) {
                case 'date_desc':
                  return  (new Date(b['date'])).getFullYear() - (new Date(a['date'])).getFullYear()
                  break;
                case 'date_asc':
                  return (new Date(a['date'])).getFullYear() - (new Date(b['date'])).getFullYear()
                  break;
                case 'rating_desc':
                  return b['stars'] - a['stars']
                  break;
                case 'rating_asc':
                  return a['stars'] - b['stars']
                  break;
                default:
                  return 0
              }
            });
          }
          //send back the pages which are required
          if (params.start) {
            reviews = reviews.slice(params.start, (params.start * 1) + 20);
          } else {
            reviews = reviews.slice(0, 20);
          }

          //caters for when there are no reviews for restraunt
          var biz_name = (!rows[0]) ? 'Fish Sticks by the Bay' : rows[0]['business_name'];
          
          resolve({name: biz_name, pages: new Array(pages), reviews: reviews});
        }
      });
    });
  },
  renderSS: function () {
    
  }
};