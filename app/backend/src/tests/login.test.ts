import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import login, { invalidLogin, token, invalidToken } from '../mocks/login';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login endpoint', () => {
  describe('POST', () => {
    it('should return token and have status 200', async () => {
      const response = await chai.request(app).post('/login').send(login);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token');
    });

    it('cannot log in without email', async () => {
      const response = await chai.request(app).post('/login').send({ password: login.password });

      expect(response).to.have.status(400);
      expect(response.body.message).to.be.eq('All fields must be filled');
    });

    it('cannot log in without password', async () => {
      const response = await chai.request(app).post('/login').send({ email: login.email });

      expect(response).to.have.status(400);
      expect(response.body.message).to.be.eq('All fields must be filled');
    });

    it('cannot log in if email is invalid', async () => {
      const response = await chai.request(app).post('/login').send({
        email: invalidLogin.email,
        password: login.password,
      });

      expect(response).to.have.status(401);
      expect(response.body.message).to.be.eq('Incorrect email or password');
    });

    it('cannot log in if password is invalid', async () => {
      const response = await chai.request(app).post('/login').send({
        email: login.email,
        password: invalidLogin.password,
      });

      expect(response).to.have.status(401);
      expect(response.body.message).to.be.eq('Incorrect email or password');
    });
  });
});

describe('/login/validate endpoint', () => {
  describe('GET', () => {
    it('should return user role', async () => {
      const response = await chai.request(app).get('/login/validate')
        .set({ 'authorization': token });

      expect(response).to.have.status(200);
      expect(response.body.role).to.be.eq('admin');
    });

    it('error when token is invalid', async () => {
      const response = await chai.request(app).get('/login/validate')
        .set({ 'authorization': invalidToken });

      expect(response).to.have.status(401);
      expect(response.body.message).to.be.eq('Invalid token');
    });
  });
});
