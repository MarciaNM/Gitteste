import { jwt } from 'jsonwebtoken';
import { UsersApi } from './graphql/user/datasource';

const authorizeUser = async(req) => {
  // req.readers.authorization
  const { headers } = req;   // requisição
  const { authorization } = headers;

  try {
    const [_bearer, token] = authorization.split('');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET); // verifica se o token é válido

    const userApi = new UsersApi(); // aula 61
    userApi.initialize({}); // aula 61
    const foundUser = await userApi.getUsers(userId);
    //console.log(userId); //aula 61

    if (foundUser.token !== token) return ''; // aula 61
    return userId;
  } catch (e) { // (e) se apresentar erro, dá uma string vazia
    console.log(e);
    return '';
  }
};

// Authorization: Bearer e a chave token
// na função abaixo valida se o usuário está logado ou não
export const context = async({ req }) => {
  const loggedUserId = await authorizeUser(req);

  return {
    loggedUserId,
  };
};
