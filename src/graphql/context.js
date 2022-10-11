import { jwt } from 'jsonwebtoken';

const authorizeUser = (req) => {
  // req.readers.authorization
  const { headers } = req;   // requisição
  const { authorization } = headers;

  try {
    const [_bearer, token] = authorization.split('');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET); // verifica se o token é válido
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
