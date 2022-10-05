//import bcrypt from 'bcrypt';
import { ValidationError } from 'apollo-server';

export const createUserFn = async (userData, DataSource) => {
  await checkUserFields(userData, true);

  const indexRefUser = await DataSource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });
  const indexRef = indexRefUser[0].indexRef + 1;

  const foundUser = await userExists(userData.userName, DataSource);

  if (typeof foundUser !== 'undefined ') {
    throw new ValidationError(
      `User ${userData.userName} has already been taken`,
    );
  }
  return DataSource.post('', {
    ...userData,
    indexRef,
    createdAt: new Date().toISOString(),
  });
};
export const updateUserFn = async (userId, userData, DataSource) => {
  await checkUserFields(userData, false);

  if (!userId) throw new ValidationError('Missing userId');

  if (userData.userName) {
    const foundUser = await userExists(userData.userName, DataSource);

    if (typeof foundUser !== 'undefined' && foundUser.id !== userId) {
      throw new ValidationError(
        `userName ${userData.userName} has already been taken`,
      );
    }
  }
  return DataSource.patch(userId, { ...userData });
};

export const deleteUserFn = async (userId, DataSource) => {
  if (!userId) throw new ValidationError('Missing userId');

  return !!(await DataSource.delete(userId));
};

const userExists = async (userName, DataSource) => {
  // /users/?userName=nomeBuscado
  const found = await DataSource.get('', {
    userName,
  });
  return found[0];
};
const validateUserName = (userName) => {
  const userNameRegExp = /^[a-z]([a-z0-9_.-]+)+$/gi;

  if (!userName.match(userNameRegExp)) {
    throw new ValidationError(`userName must match ${userNameRegExp}`);
  }
};

//const validateUserPassword = (password) => {
// Letra minúscula, letra maiúscula e número
//const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}$/;

//if (!password.match(strongPasswordRegex)) {
//throw new UserInputError(
// 'Password must contain at least: ' +
//'One lower case letter, one upper case letter and one number.',
//);
//}
//};

const checkUserFields = async (user, allFieldsRequired = false) => {
  const userFields = ['firstName', 'lastName', 'userName', 'password'];

  for (const field of userFields) {
    if (!allFieldsRequired) {
      if (typeof user[field] === 'undefined') {
        continue;
      }
    }

    if (field === 'userName') {
      validateUserName(user[field]);
    }

    if (field === 'password') {
      validateUserPassword(user[field]);
    }

    if (!user[field]) {
      throw new Error(`Missing ${field}`);
    }
  }

  //if (user.password && !user.passwordHash) {
  // const { password } = user;
  // const passwordHash = await bcrypt.hash(password, 12);
  //user.passwordHash = passwordHash;
  // delete user['password'];
  // }
};

