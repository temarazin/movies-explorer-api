/* eslint-disable no-undef */
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const request = supertest(app);

beforeAll((done) => {
  done();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET wrong endpoint', () => {
  it('[/] Status code is 404', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(404);
  });
  it('[/some-wrong-endpoint/] Status code is 404', async () => {
    const response = await request.get('/some-wrong-endpoint/');
    expect(response.status).toBe(404);
  });
});

describe('GET /movies/', () => {
  it('Status code is 200', async () => {
    const response = await request.get('/movies/');
    expect(response.status).toBe(200);
  });
  it('It is JSON format', async () => {
    const response = await request.get('/movies/');
    expect(response.headers['content-type']).toContain('application/json');
  });
  it('It is array', async () => {
    const response = await request.get('/movies/');
    expect(response.body instanceof Array).toBeTruthy();
  });
});
