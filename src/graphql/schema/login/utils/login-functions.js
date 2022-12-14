import { AuthenticationError } from 'apollo-server-errors';

export const checkIsLoggedIn = (loggedUserId) => {
  //console.log(loggedUserId); ta logando
  if (!loggedUserId) {
    throw new AuthenticationError('You have to log in');
  }
};
export const checkOwner = (userId, loggedUserId) => {
  checkIsLoggedIn(loggedUserId);
  if (loggedUserId !== userId) {
    throw new AuthenticationError('You cannot update this user');
    //console.log(loggedUserId) ta logando
  }
};

