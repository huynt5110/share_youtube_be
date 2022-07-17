
require('dotenv').config();

const redis = require('redis');
const consts = require('./constants');
const logger = require('./logger');

module.exports = async function(app) {
  const opts = {
    url: process.env.MAIN_REDIS_URL,
    enable_offline_queue: false
  };
  const client = redis.createClient(opts);
  client.on('error', err => {
    logger.error('Redis connection error: %s', err.stack);
  });
  await client.connect();
  // clear everything from redis when server restart to clear on local
  client.del(consts.SHARED_VIDEOS);

  app.set(consts.APP_REDIS_CLIENT, client);
};

