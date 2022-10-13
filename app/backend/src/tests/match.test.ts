import * as chai from 'chai';
import * as sinon from 'sinon';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import login, { invalidLogin, token, invalidToken } from '../mocks/login';
import Match from '../database/models/Match';
import matches, { match, createdMatch } from '../mocks/matches';

import * as jwt from 'jsonwebtoken';

const inProgressMatches = matches.filter((match) => match.inProgress === true);
const finishedMatches = matches.filter((match) => match.inProgress === false);

chai.use(chaiHttp);

const { expect } = chai;

describe('/matches endpoint', () => {
  describe('GET', () => {
    describe('all matches', () => {
      beforeEach(async () => {
        sinon.stub(Match, 'findAll').resolves(matches as Match[]);
      });

      afterEach(() => sinon.restore());

      it('should return all matches', async () => {
        const response = await chai.request(app).get('/matches');

        expect(response).to.have.status(200);
        expect(response.body).to.be.eql(matches);
      });
    })

    describe('in progress matches', () => {
      beforeEach(async () => {
        sinon.stub(Match, 'findAll').resolves(inProgressMatches as Match[]);
      });

      afterEach(() => sinon.restore());


      it('should return all matches in progress', async () => {
        const response = await chai.request(app).get('/matches?inProgress=true');

        expect(response).to.have.status(200);
        expect(response.body).to.be.eql(inProgressMatches);
      });
    })

    describe('finished matches', () => {
      beforeEach(async () => {
        sinon.stub(Match, 'findAll').resolves(finishedMatches as Match[]);
      });

      afterEach(() => sinon.restore());


      it('should return all finished matches', async () => {
        const response = await chai.request(app).get('/matches?inProgress=false');

        expect(response).to.have.status(200);
        expect(response.body).to.be.eql(finishedMatches);
      });
    })

    describe('create a match', () => {
      before(() => {
        sinon.stub(Match, 'create').resolves(createdMatch as Match);
        sinon.stub(jwt, 'verify').returns({ id: 1, role: 'admin' } as any)
      })

      afterEach(() => sinon.restore());

      it('should create a new match successfully', async () => {
        const response = await chai.request(app)
          .post('/matches')
          .set('authorization', 'token')
          .send(match);

        expect(response).to.have.status(201);
        expect(response.body).to.be.eql(createdMatch);
      });
    })
  });
});