import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RESTDataSource } from 'apollo-datasource-rest';
import { makeUserDataLoader } from './dataloaders';
import { AuthenticationError } from 'apollo-server-errors';

export class loginApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/users/';
    this.dataLoader = makeUserDataLoader(this.getUsers.bind(this));
  }
}

  async getUser(userName) {
  const user = await this.get('', { userName }, { cacheOptions: { ttl: 0 } });

  const found = !!user.length;

  if (!found) { // passo 2 se não existir usuário, mostra a mensagem de erro
    throw new AuthenticationError('User does not exist.');//nada encontrado
  }

  return user;
}

  // passo 1 verifica se o usuário existe
  async login(userName, password) {
  const user = await this.getUser(userName);

  //passo 3
  const { passwordHash, id: userId } = user[0];
  const isPasswordValid = await this.checkUserPassword(
    password,
    passwordHash,
  );

  if (!isPasswordValid) {
    throw new AuthenticationError('Invalid password');
  }

  const token = this.createJwtToken({ userId });

  return {
    userId,
    token,
  };
}
// passo 4 check este usuário
checkUserPassword(password, passwordHash) { //
  return bcrypt.compare(password, passwordHash); // compara os dados
}
// passo 5 validar o token
createJwtToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7 d',
  });
}
}






