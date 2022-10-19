import bcrypt from 'bcrypt';
import { ValidationError } from 'apollo-server-errors';
// passo 1
export const createUserFn = async (userData, dataSources) => { //recebe os dados do usuário e o datasource(que é o this da classe dataSource do userApi )
  await checkUserFields(userData, true); // 1. a função para receber os dados do usuário e se são todos requeridos

  // passo 6  verifica o indexRef e acrescenta mais 1
  const indexRefUser = await dataSources.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });
  const indexRef = indexRefUser[0].indexRef + 1;

  const foundUser = await userExists(userData.userName, dataSources); // passo 7 verifica na função userExists se o usuário já não existe na base
  if (typeof foundUser !== 'undefined ') {   // passo 9 - se usuário encontrado mostra a mensagem que já existe
    throw new ValidationError(
      `UserName ${userData.userName} has already been taken`,
    );
  }
  // passo 10 - passando cria o usuário com os dados abaixo
  return dataSources.post('', {
    ...userData,
    indexRef,
    createdAt: new Date().toISOString(),
  });
};
// passo 11
export const updateUserFn = async (userId, userData, dataSources) => {
  await checkUserFields(userData, false);

  if (!userId) throw new ValidationError('Missing userId');

  // passo 12 confere o se o usuário já tem
  if (userData.userName) {
    const foundUser = await userExists(userData.userName, dataSources);

    if (typeof foundUser !== 'undefined' && foundUser.id !== userId) {// se o usuário não é indefinido e se for diferente do usuário que tem, mostra o erro.
      throw new ValidationError(
        `userName ${userData.userName} has already been taken`,
      );
    }
  }
  return dataSources.patch(userId, { ...userData });
};

export const deleteUserFn = async (userId, dataSources) => {
  if (!userId) throw new ValidationError('Missing userId');

  return !!(await dataSources.delete(userId));
};
// passo 8 busca se o usuário existe
const userExists = async (userName, dataSources) => {
  const [found] = await dataSources.get('', {
    userName,
  });
  return found; // retorna o dado encontrado
};
// passo 5
const validateUserName = (userName) => { // faz a validação do nome que inicie com letras
  const userNameRegExp = /^[a-z]([a-z0-9_.-]+)+$/gi;

  if (!userName.match(userNameRegExp)) { // se o nome não for parecido com a expressão regular, mostra a mensagem da expressão
    throw new ValidationError(`userName must match ${userNameRegExp}`);
  }
};
//aula 57.3
const validateUserPassword = (password) => {
  // se a senha tem letra minúscula, maiúscula e número
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}$/;

  //console.log(!password.match(strongPasswordRegex)); para testar se está ok.

  if (!password.match(strongPasswordRegex)) { // aula 57.4
    throw new UserInputError(
      'Password must contain at least:' +
      'One lower case letter, onde upper letter and onde number.',
    );
  }
};

// passo 2
const checkUserFields = async (user, allFieldsRequired = false) => { //recebe os dados e se todos são requeridos
  const userFields = ['firstName', 'lastName', 'userName', 'password']; // password: aula 57.1
  // passo 3
  for (const field of userFields) { // se algum campo não é requerido pula para o próximo
    if (!allFieldsRequired) {
      if (typeof user[field] === 'undefined') {
        continue;
      }
    }
    // passo 4
    // se tiver a userName a função validateUserName serve para validar a descrição do nome
    if (field === 'userName') {
      validateUserName(user[field]);
    }
    if (field === 'password') { // aula 57.2
      validateUserPassword(user[field]);
    }

    if (!user[field]) {
      throw new Error(`Missing ${field}`);
    }
  }
  // aula 57.5
  if (user.password && !user.passwordHash) {
    const { password } = user;
    const passwordHash = await bcrypt.hash(password, 12);
    user.passwordHash = passwordHash;
    delete user['password'];
  }
};
