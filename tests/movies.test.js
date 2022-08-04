/* eslint-disable no-undef */
/*
  для ревьюера: тесты я писал больше для себя, чтобы потренироваться, и тут много что надо
  переделать – в любом случае, в критериях тестов вроде нет, поэтому я думаю не страшно, если
  тут висит эта незаконченная штука.
*/
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');

const request = supertest(app);
const testUser = {
  name: 'test',
  email: 'test@mail.ru',
  password: 'n123456',
};
const testUser2 = {
  name: 'test2',
  email: 'test2@mail.ru',
  password: 'n123456',
};
const testMovie = {
  country: 'some country',
  director: 'some director',
  duration: '999',
  year: '2000',
  description: 'some description',
  image: 'https://some.url/image.jpg',
  trailerLink: 'https://some.url/image.jpg',
  thumbnail: 'https://some.url/image.jpg',
  movieId: 123,
  nameRU: 'Какое-то название',
  nameEN: 'some title',
};
let cookie;
let authStatus;

beforeAll(async () => {
  const createResponse = await request.post('/signup').send(testUser);
  const { email, password } = testUser;
  const response = await request.post('/signin')
    .send({ email, password });
  cookie = response.headers['set-cookie'];
  testUser._id = createResponse._body._id;
  authStatus = response.statusCode;
});

afterAll(async () => {
  const user = await User.findOne({ email: testUser.email });
  if (user) {
    await User.findByIdAndRemove(user._id);
  }
  await mongoose.connection.close();
});

describe('Test starts', () => {
  it('The test user has been created and logged in', () => {
    expect(authStatus).toBe(200);
  });
});

describe('GET wrong endpoint', () => {
  it('[/] Status code is 404', async () => {
    const response = await request.get('/').set('Cookie', cookie);
    expect(response.status).toBe(404);
  });
  it('[/some-wrong-endpoint/] Status code is 404', async () => {
    const response = await request.get('/some-wrong-endpoint/').set('Cookie', cookie);
    expect(response.status).toBe(404);
  });
});

describe('GET /movies/', () => {
  let response;

  beforeEach(async () => {
    response = await request.get('/movies/').set('Cookie', cookie);
  });

  it('Status code is 200', () => {
    expect(response.status).toBe(200);
  });
  it('It is JSON format', async () => {
    expect(response.headers['content-type']).toContain('application/json');
  });
  it('It is array', async () => {
    expect(response.body instanceof Array).toBeTruthy();
  });
});

describe('POST and DELETE /movies/', () => {
  let movieId;

  it('Can\'t add movie without auth (401)', async () => {
    response = await request.post('/movies/').send(testMovie);
    expect(response.status).toBe(401);
  });

  it('Can add movie with auth (201)', async () => {
    response = await request.post('/movies/').send({ ...testMovie, owner: testUser._id }).set('Cookie', cookie);
    movieId = response._body._id;
    expect(response.status).toBe(201);
  });

  it('Movie has _id in response on post /movie/', () => {
    expect(response._body._id).toBeDefined();
  });

  it('Can\'t remove movie without auth (401)', async () => {
    response = await request.delete(`/movies/${movieId}`);
    expect(response.status).toBe(401);
  });

  it('removing movie with not existing id returns not found (404)', async () => {
    response = await request.delete('/movies/1234567890abcdef12345678').set('Cookie', cookie);
    expect(response.status).toBe(404);
  });

  it('removing movie with wrong id format returns bad request (400)', async () => {
    response = await request.delete('/movies/test').set('Cookie', cookie);
    expect(response.status).toBe(400);
  });

  it('Can remove my own movie (200)', async () => {
    response = await request.delete(`/movies/${movieId}`).set('Cookie', cookie);
    expect(response.status).toBe(200);
  });

  it('Can\'t remove not my own movie (403)', async () => {
    const createResponse = await request.post('/signup').send(testUser2);
    testUser2._id = createResponse._body._id;
    const { email, password } = testUser2;
    const userResponse = await request.post('/signin').send({ email, password });
    const user2cookie = userResponse.headers['set-cookie'];
    const movieResponse = await request.post('/movies/').send({ ...testMovie, owner: testUser2._id }).set('Cookie', user2cookie);
    const result = await request.delete(`/movies/${movieResponse._body._id}`).set('Cookie', cookie);
    expect(result.status).toBe(403);
    await request.delete(`/movies/${movieResponse._body._id}`).set('Cookie', user2cookie);
    const user2 = await User.findOne({ email: testUser2.email });
    if (user2) {
      await User.findByIdAndRemove(user2._id);
    }
  });
});
