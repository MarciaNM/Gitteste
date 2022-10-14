import { AuthenticationError } from 'apollo-server-errors';

export const checkIsLoggedIn = (loggedUserId) => {
  if (!loggedUserId) { // aula 63
    throw new AuthenticationError('you have to log in');
  }
};
export function checkOwner(userId, loggedUserId) {
  checkIsLoggedIn(loggedUserId);

  if (loggedUserId !== userId) { // aula 63
    throw new AuthenticationError('you cannot update this user.');
  }
}
