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


// aula 71 a 74 comentado porque não vais er autenticado via cookie e sim token
//const verifyJwtToken = async (token) => {
 // try {
   // const { userId } = jwt.verify(token, process.env.JWT_SECRET);

   // const userApi = new UsersApi(); // aula 71
  //  userApi.initialize({}); // aula 71
    //const foundUser = await userApi.getUser(userId);
  
    //if (foundUser.token !== token) return ''; // aula 71
    //return userId; // aula 71
  //} catch (e) { // (e) se apresentar erro, dá uma string vazia
    // console.log(e);
   // return '';
  //}
//};

//const authorizeUserWithBearerToken = async (req) => {
 // if (!req || !req.headers || !req.headers.authorization) return '';
  //req.headers.authorization
  //const { headers } = req; // requisição
 // const { authorization } = headers;

  // authorization: Bearer token(é a chave do token)
  //try {
   // const [_bearer, token] = authorization.split(' ');
   // return await verifyJwtToken(token);
  //} catch (e) { // (e) se apresentar erro, dá uma string vazia
    // console.log(e);
   // return '';
 // }
//};

//const cookieParser = (cookiesHeader) => {

 // if (typeof cookiesHeader != 'string') return {};

 // const cookies = cookiesHeader.split(/;\s*/);


  //const parsedCookie = {};
  //for (let i = 0; i < cookies.length; i++) {
   // const [key, value] = cookies[i].split('=');
   // parsedCookie[key] = value;
  //}


  //return JSON.parse(JSON.stringify(parsedCookie));
//};

//export const context = async ({ req, res }) => {  // res aula 70 cookie
  //let loggedUserId = await authorizeUserWithBearerToken(req);

  //console.log(req.headers.cookie);

  //if (!loggedUserId) {
  //  if (req.headers.cookie) {
  //    const { jwtToken } = cookieParser(req.headers.cookie);
   //   loggedUserId = await verifyJwtToken(jwtToken);
   // }
  //}

  export const context = async ({ req }) => {  
  const loggedUserId = await authorizeUser(req);

  console.log(req);

  return {
    loggedUserId,
    req,
  };
};
