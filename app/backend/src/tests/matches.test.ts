import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { teamListMock } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração dos jogos', () => {
  it('Testa se retorna lista de todos os jogos corretamente', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(teamListMock as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamListMock);
  });

  it('Testa se retorna lista correta com jogos filtrados por inProgress', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(teamListMock as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamListMock);
  });
})