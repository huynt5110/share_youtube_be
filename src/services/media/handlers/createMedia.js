const constants = require('../../../constants');

module.exports = class MediaRecord {
  constructor({ data, params }) {
    this.data = data;
    this.params = params;
  }

  async call() {
    const { user, redisClient } = this.params;
    const recordPayload = {
      ...this.data,
      userEmail: user.email,
      userId: user.id
    };

    const storedVideos = await redisClient.get(constants.SHARED_VIDEOS);
    const sharedVideos = JSON.parse(storedVideos) || [];
    await redisClient.set(constants.SHARED_VIDEOS, JSON.stringify([...sharedVideos, recordPayload]));

    return recordPayload;
  }
};
