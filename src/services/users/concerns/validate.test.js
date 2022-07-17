const  validate = require('./validate');

describe('validate funcion', () => {
  it('full data', () => {
    const context = { data : {
      email: 'hello@feathersjs.com',
      password: 'supersecret'
    }};
    const result = validate(context);
    expect(result).toEqual(context);
  });

  it('should thrown error when missing password', () => {
    const context = { data : {
      email: 'hello@feathersjs.com'
    }};
    expect(() => validate(context)).toThrow(Error);
  });

  it('should thrown error when missing email', () => {
    const context = { data : {
      password: 'supersecret'
    }};
    expect(() => validate(context)).toThrow(Error);
  });
});