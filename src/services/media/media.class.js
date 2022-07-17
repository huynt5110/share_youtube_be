const { Service } = require('feathers-memory');
const { MediaRecordRetrival, MediaRecord } = require('./handlers');

exports.Media = class Media extends Service {
  async find(params) {
    return new MediaRecordRetrival({ params }).call();
  }

  async create(data, params) {
    return new MediaRecord({ data, params }).call();
  }
};
