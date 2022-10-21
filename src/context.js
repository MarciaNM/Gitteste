import jwt from 'jsonwebtoken';
import { UsersApi } from './graphql/user/datasource';

const authorizeUser = async (req) => {
  //req.headers.authorization
  const { headers } = req; // requisição
  const { authorization } = headers;

  // authorization: Bearer token(é a chave do token)
  try {
    const [_bearer, token] = authorization.split('');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const userApi = new UsersApi(); // aula 61
    userApi.initialize({}); // aula 61
    const foundUser = await userApi.getUser(userId);
   console.log(userId); //aula 61

    if (foundUser.token !== token) return ''; // aula 61
    return userId; // aula 61
  } catch (e) { // (e) se apresentar erro, dá uma string vazia
   // console.log(e);
    return '';
  }
};

export const context = async({ req }) => {
  const loggedUserId = await authorizeUser(req);
  //console.log(loggedUserId);
  return {
    loggedUserId,
  };
};
