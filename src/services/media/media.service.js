// Initializes the `users` service on path `/users`
const { Media } = require('./media.class');
const hooks = require('./media.hooks');

module.exports = function (app) {
  const options = {
  };

  app.use('/media', new Media(options, app));
  const service = app.service('media');

  service.hooks(hooks);
};
