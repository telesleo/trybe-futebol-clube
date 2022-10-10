import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import login from '../mocks/login';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login endpoint', () => {
  describe('POST', () => {
    it('should return token and have status 200', async () => {
      const response = await chai.request(app).post('/login').send(login);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token');
    });
  });
});
