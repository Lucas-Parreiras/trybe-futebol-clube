import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { sequelizeResponse,
  validToken,
  bodyInfo,
  bodyInfoWithoutEmail,
  wrongEmailInfo,
  infoInvalidPassword } from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração dos usuários', () => {
  beforeEach(sinon.restore);

  it('Testa se usuário loga corretamente e recebe um token', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(sequelizeResponse as any);
    sinon.stub(jwt, 'sign').returns(validToken as any);
    sinon.stub(bcrypt, 'compareSync').returns(true);

    const { status, body } = await chai.request(app).post('/login').send(bodyInfo);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ token: validToken });
  });

    it('Testa se não fornecido um email retorna um erro', async () => {
    const { status, body } = await chai.request(app).post('/login').send(bodyInfoWithoutEmail);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('Testa se fornecido email inválido retorna um erro', async () => {
    const { status, body } = await chai.request(app).post('/login').send(wrongEmailInfo);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Testa se fornecido senha incorreta retorna um erro', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(sequelizeResponse as any);
    sinon.stub(bcrypt, 'compareSync').returns(false);

    const { status, body } = await chai.request(app).post('/login').send(infoInvalidPassword);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });
});
