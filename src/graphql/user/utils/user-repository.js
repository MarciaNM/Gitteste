import { ValidationError } from 'apollo-server-errors';
// passo 1
export const createUserFn = async (userData, DataSource) => { //recebe os dados do usuário e o datasource(que é o this da classe dataSource do userApi )
 checkUserFields(userData, true); // 1. a função para receber os dados do usuário e se são todos requeridos

  // passo 6  verifica o indexRef e acrescenta mais 1
  const indexRefUser = await DataSource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });
  const indexRef = indexRefUser[0].indexRef + 1;

  const foundUser = await userExists(userData.userName, DataSource); // passo 7 verifica na função userExists se o usuário já não existe na base
  if (typeof foundUser === 'undefined ') {   // passo 9 - se usuário encontrado mostra a mensagem que já existe
    throw new ValidationError(
      `UserName ${userData.userName} has already been taken`,
    );
  }
  // passo 10 - passando cria o usuário com os dados abaixo
  return DataSource.post('', {
    ...userData,
    indexRef,
    createdAt: new Date().toISOString(),
  });
};
// passo 11
export const updateUserFn = async (userId, userData, DataSource) => {
   checkUserFields(userData, false);

  if (!userId) throw new ValidationError('Missing userId');
// passo 12 confere o se o usuário já tem
  if (userData.userName) {
    const foundUser = await userExists(userData.userName, DataSource);

    if (typeof foundUser !== 'undefined' && foundUser.id !== userId) {// se o usuário não é indefinido e se for diferente do usuário que tem, mostra o erro.
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
// passo 8 busca se o usuário existe
const userExists = async (userName, DataSource) => {
  const [found] = await DataSource.get('', {
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
// passo 2
const checkUserFields = (user, allFieldsRequired = false) => { //recebe os dados e se todos são requeridos
  const userFields = ['firstName', 'lastName', 'userName'];
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

    if (!user[field]) {
      throw new Error(`Missing ${field}`);
    }
  }
};

