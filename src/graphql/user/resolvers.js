import fetch from 'node-fetch';

const user = async (_, __, { fetch }) => {
  console.log(fetch);
  const users = await fetch('http://localhost:3000/users');
  return users.json();
};

const users = async (_, __, { fetch }) => {
  console.log(fetch);
  const user = await fetch('http://localhost:3000/users/602');
  return user.json();
};

const user = async () => {
  return {
    id: '1',
    userName: 'Márcia',
  };
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
