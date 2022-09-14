const users = () => {
  return [
    {
      id: '1',
      usarName: 'Márcia',
    },
    {
      id: '2',
      usarName: 'Marcos',
    },
    {
      id: '3',
      usarName: 'Maria',
    },
  ];
};

const user = () => {
  return {
    id: '1',
    usarName: 'Márcia',
  };
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
