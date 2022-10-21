import { jwt } from 'jsonwebtoken';
import { UsersApi } from './graphql/user/datasource';

const authorizeUser = (req) => {
  // req.readers.authorization
  const { headers } = req;   // requisição
  const { authorization } = headers;

  try {
    const [_bearer, token] = authorization.split('');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET); // verifica se o token é válido

    const userApi = new UsersApi(); // aula 61
    userApi.initialize({}); // aula 61
    const foundUser = await userApi.getUser(userId);
    //console.log(userId); //aula 61
    
    if (foundUser.token !== token) return ''; // aula 61
    return userId;
  } catch (e) { // (e) se apresentar erro, dá uma string vazia
    return '';
  }
};

  // Authorization: Bearer e a chave token
  // na função abaixo valida se o usuário está logado ou não
export const context = ({ req }) => {
  const loggedUserId = authorizeUser(req);

  return {
    loggedUserId,
  };
};
