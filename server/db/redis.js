var redis = require("redis");
const dotenv = require('dotenv').config();

client = redis.createClient(6379, process.env.REDIS_IP);

