export const login = async (_, { data }, { dataSources }) => {
  const { userName, password } = data;
  return dataSources.LoginApi.login(userName, password);
  //return dataSources.loginApi.login(userName, password);antes
};

export const loginResolvers = {
  Mutation: { login },
};
