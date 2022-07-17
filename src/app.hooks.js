const constants = require('./constants');

const setClientToParams = (ctx) => {
  ctx.params.redisClient = ctx.app.get(constants.APP_REDIS_CLIENT);
  return ctx;
};

module.exports = {
  before: {
    all: [setClientToParams],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
