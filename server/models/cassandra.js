var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  get: (id, params) => {
    return new Promise((resolve, reject) => {
      //console.log(params);
      var query = `SELECT business_name, stars, date, text,
      useful, funny, cool, user_id, user_name,
      review_count as user_reviewcount, yelping_since as user_yelping_since,
      user_useful, user_funny, user_cool,
      user_fans, average_stars as user_average_stars, tag as user_pic
      FROM oneTable 
      WHERE business_id = ? `;
      //other sort factors (apart from useful not working yet)
      query += 'ORDER BY useful desc, date desc';
     
      // if enabled can imporve from 895.5 to 1000+
      if (!params.sort_by) {
        query += ' limit 20';
      }

      // if (params.q) {
      //   query = `select * from (` + query + `) as reviews where reviews.text like '%${params.q}%'`
      // }
      db.execute(query, [id], { prepare: true }, (err, result) => {
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

          resolve({name: rows[0]['business_name'], pages: new Array(pages), reviews: reviews});
        }
      });
      // query += ' limit 20';
      // if (params.start) {
      //   query += ` offset ${params.start}`
      // }
    });
  }
};