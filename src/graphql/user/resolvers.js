const users = () => {
  return [
    {
      id: '1',
      userName: 'Márcia',
    },
    {
      id: '2',
      userName: 'Marcos',
    },
    {
      id: '3',
      userName: 'Maria',
    },
  ];
};

const user = () => {
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
