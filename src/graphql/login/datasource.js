import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RESTDataSource } from 'apollo-datasource-rest';
import { AuthenticationError } from 'apollo-server-errors';

export class LoginApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/users/';
  }
  async getUser(userName) {
    //async login(userName,password) {
    const user = await this.get('', { userName }, { cacheOptions: { ttl: 0 } });
    const found = !!user.length;

    if (!found) {
      throw new AuthenticationError('User does not exist.');
    }

    return user;
  }

  async login(userName, password) {
    const user = await this.getUser(userName);

    const { passwordHash, id: userId } = user[0];
    const isPasswordValid = await this.checkUserPassword(
      password,
      passwordHash,
    );

    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid password.');
    }

    const token = this.createJwtToken({ userId });
    await this.patch(userId, { token }, { cacheOptions: { ttl: 0 } });//aula 61 cada vez de logar ele atualiza o token

    return {
      userId,
      token,
    };
  }
  async logout(userName) { // aula 68
    const user = await this.getUser(userName);

    if (user[0].id !== this.context.loggedUserId) { // aula 68
      throw new AuthenticationError('You are not this user.');
    }
    await this.patch(user[0].id, { token: '' }, { cacheOptions: { ttl: 0 } });
    //this.context.res.clearCookie('jwtToken'); // aula 72 será utilizado o token e não cookie
    return true;
  }

  checkUserPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  createJwtToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
  }
}

