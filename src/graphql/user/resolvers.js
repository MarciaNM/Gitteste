const users = async (_, { input }, { getUsers }) => {
  const ApiFiltersInput = new URLSearchParams(input);
  const users = await getUsers('/?' + ApiFiltersInput);
  return users.json();
};
const user = async (_, { id }, { getUsers }) => {
  const response = await getUsers('/' + id);
  const user = await response.json();
  return user;
};

const posts = ({ id }, _, { dataSources }) => {
  return dataSources.postApi.dataLoader.load(id);
};

export const userResolvers = {
  Query: { user, users },
  User: { posts },
};
