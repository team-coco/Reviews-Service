const dotenv = require('dotenv').config();

//MY SQL DB REQUIREMENTS
const mysql = require('mysql');

//CASS REQURIEMENTS
const cassandra = require('cassandra-driver');
const distance = cassandra.types.distance;
const IdempotenceAwareRetryPolicy = require('cassandra-driver').policies.retry.IdempotenceAwareRetryPolicy;
const RetryPolicy = require('cassandra-driver').policies.retry.RetryPolicy;
const async = require('async');



const database = process.env.DB || "yelp_db";
const password = process.env.DB_PASSWORD || "";

var con;

console.log('DB CHOICE: ', process.env.DB_CHOICE);
if (process.env.DB_CHOICE ==='sql') {
  const host = process.env.DB_HOST || '127.0.0.1';
  con = mysql.createConnection({
    host: host,
    user: "root",
    database: database,
    password: password
  });
  
  con.connect(function(err) {
    if (err) {
      console.log(err);
    } else {
  
      console.log('Connected!');
    }
  });
} else if (process.env.DB_CHOICE === 'cassandra') {
    const host = process.env.DB_HOST.split(' ') || ['127.0.0.1'];
    con = new cassandra.Client({
      contactPoints: host,
      keyspace: database,
      pooling: {
        coreConnectionsPerHost: {
          [distance.local] : 10,
          [distance.remote] : 10
        }},
      policies: {
        retry: new IdempotenceAwareRetryPolicy(new RetryPolicy())
     }
    });
    con.connect(function(err) {
      if (err) return console.error(err);
      console.log(`Connected to cluster with ${con.hosts.length} hosts: ${con.hosts.keys()}`);
      con.hosts.forEach(function (host) {
        console.log(host.address, host.datacenter, host.rack);
      });
    })
    con.on('log', function(level, className, message, furtherInfo) {
      if (level != 'verbose') {
             console.log('cassandra: %s -- %s', level, message);
      }
  });
}

module.exports = con;