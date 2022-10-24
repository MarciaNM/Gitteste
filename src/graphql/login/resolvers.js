export const login = async (_, { data }, { dataSources }) => {
  const { userName, password } = data;
  return dataSources.loginApi.login(userName, password);
  //return dataSources.loginApi.login(userName, password);antes
};
export const logout = async (_, { userName }, { dataSources}) => {
  return dataSources.loginApi.logout(userName);
};

export const loginResolvers = {
  Mutation: { login,logout },
};
