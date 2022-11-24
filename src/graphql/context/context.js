import jwt from 'jsonwebtoken';
import { UsersApi } from '../schema/user/datasource';

const verifyJwtToken = async (token) => {
  try {
    
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const userApi = new UsersApi(); // aula 71
    userApi.initialize({}); // aula 71
    const foundUser = await userApi.getUser(userId);

    if (foundUser.token !== token) return ''; // aula 71
    return userId; // aula 71
  } catch (e) { // (e) se apresentar erro, dá uma string vazia
    // console.log(e);
    return '';
  }
};

const authorizeUserWithBearerToken = async (req) => {
  if (!req || !req?.headers || !req?.headers.authorization) return '';

  //req.headers.authorization
  const { headers } = req; // requisição
  const { authorization } = headers;

  // authorization: Bearer token(é a chave do token)
  try {
    const [_bearer, token] = authorization.split(' ');
    //console.log(await verifyJwtToken(token))
    return await verifyJwtToken(token);
  } catch (e) { // (e) se apresentar erro, dá uma string vazia
    // console.log(e);
    return '';
  }
};

const cookieParser = (cookiesHeader) => {
  // The final goal is to return an object with key/value reflecting
  // the cookies. So, this functions always returns an object.

  // If we do not receive a string, we won't do anything.
  if (typeof cookiesHeader != 'string') return {};

  const cookies = cookiesHeader.split(/;\s*/);

  // If we have something similar to cookie, we want to add them
  // to the final object
  const parsedCookie = {};
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split('=');
    parsedCookie[key] = value;
  }

  // The reason I'm using JSON here is to make sure the final
  // object won't have any undefined value.
  return JSON.parse(JSON.stringify(parsedCookie));
};

export const context = async ({ req, res, connection }) => {  // res aula 70 cookie
  //console.log(connection);
  const reqOrConnection = req || connection?.context?.req; // a requisição é via http ou web soquet
  let loggedUserId = await authorizeUserWithBearerToken(reqOrConnection);

  //console.log(reqOrConnection.headers);

   if (!loggedUserId) {
    if (reqOrConnection && reqOrConnection?.headers && reqOrConnection?.headers.cookie) { // aula 93 validar o token para a conexão(cookie)
      const { jwtToken } = cookieParser(req.headers.cookie);
      loggedUserId = await verifyJwtToken(jwtToken);
    }
  }

  return {
    loggedUserId,
    res,
  };
};

 