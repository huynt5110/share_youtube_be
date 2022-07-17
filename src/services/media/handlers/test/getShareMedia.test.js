const MediaRecordRetrival = require('../getSharedMedia');

const email = '@feathersjs.com';

describe('retrival media', () => {
  it('normal flow', async ()=> {
    const params = {
      redisClient: {
        get: jest.fn().mockReturnValueOnce(null)
      }
    };
    const result = await new MediaRecordRetrival({ params }).call();
    expect(result).toEqual([]);
  });

  it('1 video recored flow', async ()=> {
    const recordedVideos = [{
      url: 'https://www.youtube.com/watch?v=qGiOqv70CyQ1',
      date: '2022-16-07 16:00:00',
      userEmail: email,
      userId: 0
    }];

    const params = {
      redisClient: {
        get: jest.fn().mockReturnValueOnce(JSON.stringify(recordedVideos))
      }
    };
    const result = await new MediaRecordRetrival({ params }).call();
    expect(result).toEqual(recordedVideos);
  });
});