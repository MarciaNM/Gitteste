import { AuthenticationError } from 'apollo-server-errors';

export const checkOwner = (loggedUserId) => {
  if (!loggedUserId) { // aula 63
    throw new AuthenticationError('you have to log in');
  }
};
export const  =  (userId, loggedUserId) => { // aula 63
  checkIsLoggedIn(loggedUserId);

  if (loggedUserId !== userId) { // aula 63
    throw new AuthenticationError('you cannot update this user.');
  }
};
