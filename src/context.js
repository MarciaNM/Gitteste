import jwt from 'jsonwebtoken';

const authorizeUser = (req) => {
  //req.headers.authorization
  const { headers } = req;
  const { authorization } = headers;

  // authorization: Bearer token(é a chave do token)
  try {
    const [_bearer, token] = authorization.split('');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
  }catch (e) {
    return '';
  }
};

export const context = ({ req }) => {
 const loggedUserId = authorizeUser(req);

 return {
  loggedUserId,
 };
};
