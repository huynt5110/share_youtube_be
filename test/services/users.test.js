const axios = require('axios');
const app = require('../../src/app');
const url = require('url');
const port = 8998;

const getUrl = pathname => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname
});

describe('\'users\' service', () => {
  let server;
  let accessToken;

  beforeAll(done => {
    server = app.listen(port);
    server.once('listening', () => done());
  });

  afterAll(done => {
    server.close(done);
  });

  it('registered the service', () => {
    const service = app.service('users');
    expect(service).toBeTruthy();
  });

  it('registered the service', () => {
    const service = app.service('media');
    expect(service).toBeTruthy();
  });

  it('create new user', async () => {
    const { data } = await axios.post(getUrl('/users'), {
      email: 'hello@feathersjs.com',
      password: 'supersecret'
    });
    expect(data.id).not.toBeNull();
  });

  it('create new user missing password', async () => {
    const data = await axios.post(getUrl('/users'), {
      email: 'hello@feathersjs.com'
    }).catch(e => ({e}));
    expect(data.e).toBeTruthy;
  });

  it('get jwt', async () => {
    const { data } = await axios.post(getUrl('/authentication'), {
      email: 'hello@feathersjs.com',
      password: 'supersecret',
      strategy: 'local'
    });
    accessToken = data.accessToken;
    expect(data.accessToken).not.toBeNull();
    expect(data.user).toEqual({ email: 'hello@feathersjs.com', id: 0 });
  });

  it('record new media', async () => {
    const { data, status} = await axios.post(getUrl('/media'), {
      'url': 'https://www.youtube.com/watch?v=qGiOqv70CyQ1',
      'date': '2022-16-07 16:00:00'
    }, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    expect(data.userId).toBe(0);
    expect(status).toBeGreaterThan(200);
  });

  it('get recorded media', async () => {
    const { data, status } = await axios.get(getUrl('/media'));
    expect(data).toEqual([
      {
        url: 'https://www.youtube.com/watch?v=qGiOqv70CyQ1',
        date: '2022-16-07 16:00:00',
        userEmail: 'hello@feathersjs.com',
        userId: 0
      }
    ]);
    expect(status).toBe(200);
  });
});
