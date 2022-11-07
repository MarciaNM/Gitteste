import jwt from 'jsonwebtoken';
import { UsersApi } from './graphql/user/datasource';

const authorizeUser = async (req) => {
  const { headers } = req; // requisição
  const { authorization } = headers;

  try {
    const [_bearer, token] = authorization.split(' ');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const userApi = new UsersApi();
    userApi.initialize({});
    const foundUser = await userApi.getUser(userId);

    if (foundUser.token !== token) return '';
    return userId;
  } catch (e) { // (e) se apresentar erro, dá uma string vazia
    //console.log(e);
    return '';
  }
};

export const context = async ({ req }) => {
  const loggedUserId = await authorizeUser(req);

  return {
    loggedUserId,
    req,
  };
};
