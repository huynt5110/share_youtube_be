const constants = require('../../../constants');

module.exports = class MediaRecordRetrival {
  constructor({ params }) {
    this.params = params;
  }

  async call() {
    const { redisClient } = this.params;
    const storedVideos = await redisClient.get(constants.SHARED_VIDEOS);
    const sharedVideos = JSON.parse(storedVideos) || [];

    return sharedVideos;
  }
};
