import { ValidationError } from 'apollo-server';

export const createPostFn = async (posData, dataSources) => {
  const postInfo = await createPostInfo(postData, dataSources);
  const { title, body, userId } = postInfo;

  if (!title || !body || !userId) {
    throw new ValidationError('you have to send title, body e userId');
  }
  return await dataSources.post('', { ...postInfo });
};

const userExists = async (userId, dataSources) => {
  try {
    await dataSources.context.dataSources.userApi.get(userId);
  catch (e) {
      throw new ValidationError('User ${userId} does not exist');
    }
  };

  const createPostInfo = async (postData, dataSources) => {
    const { title, body, userId } = postData;

    await userExists(userId, dataSources);

    const indexRef = await dataSources.get('', {
      _limit: 1,
      _sort: 'indexRef',
      _order: 'desc'
    });

    const indexRef = indexRefPost[0].indexRef + 1;

    return {
      title,
      body,
      indexRef,
      createdAt: new Date().toISOString(),
    };
  };
