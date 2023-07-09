import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { teamsMock, teamFoundedById } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração dos times', () => {
  beforeEach(sinon.restore);

  it('Testa se retorna todos os times corretamente', async () => {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teamsMock as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMock);
  });

  it('Testa se retorna time procurado por id corretamente', async () => {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(teamFoundedById as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamFoundedById);
  });

  it('Testa se retorna erro caso não encontre um time', async () => {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/20');

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Time não encontrado' });
  });
});
