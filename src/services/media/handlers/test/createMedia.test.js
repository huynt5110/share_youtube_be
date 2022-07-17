const MediaRecord = require('../createMedia');

const email = '@feathersjs.com';

describe('create media', () => {
  it('normal flow', async ()=> {
    const data = {
      'url': 'https://www.youtube.com/watch?v=qGiOqv70CyQ1',
      'date': '2022-16-07 16:00:00'
    };
    const params = {
      user: {
        email,
        id: 0
      },
      redisClient: {
        get: jest.fn().mockReturnValueOnce(null),
        set: jest.fn(() => 'ok')
      }
    };
    const result = await new MediaRecord({ data, params }).call();
    expect(result).toEqual({...data, ...{ userEmail: email, userId: 0 }});
  });
});