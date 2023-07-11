export const validToken = 'V4L1DT0K3N';

export const validUser = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
};

export const sequelizeResponse = {
  dataValues: validUser,
};

export const passwordWithoutEncrypt = 'secret_admin';

export const bodyInfo = {
  email: validUser.email,
  password: passwordWithoutEncrypt,
};

export const bodyInfoWithoutEmail = {
  password: 'anypassword',
};

export const wrongEmailInfo = {
  email: 'anything.com',
  password: passwordWithoutEncrypt,
};

export const infoInvalidPassword = {
  email: validUser.email,
  password: '1234567',
};
