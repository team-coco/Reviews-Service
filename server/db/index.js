var mysql = require('mysql');

var con = mysql.createConnection({
  host: "chompy-test-database.cr8yw4uwndba.us-west-1.rds.amazonaws.com",
  user: "root",
  database: "chompyremote",
  password: "chompydatabase"
});
// var con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'chompy'
// });

con.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log('Connected!');
});

module.exports = con;