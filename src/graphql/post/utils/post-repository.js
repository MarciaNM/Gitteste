import { DataSource } from 'apollo-datasource';
import { ValidationError } from 'apollo-server';

export const createPostFn = async (posData, dataSource) => {
  const postInfo = await createPostInfo(postData, dataSource);
  const { title, body, userId } = postInfo;

  if (!title || !body || !userId) {
    throw new ValidationError('you have to send title, body e userId');
  }
  return await dataSource.post('', { ...postInfo });
};

const userExists = async (userId, dataSource) => {
  try {
    await dataSource.context.DataSource.userApi.get(userId);
  catch (e) {
      throw new ValidationError('User ${userId} does not exist');
    }
  };

  const createPostInfo = async (postData, dataSource) => {
    const { title, body, userId } = postData;

    await userExists(userId, dataSource);

    const indexRef = await dataSource.get('', {
      _limit: 1,
      _sort: 'indexRef',
      _order: 'desc'
    });

    const indexRef = indexRefPost[0].indexRef + 1;

    return {
      title,
      body,
      userId,
      indexRef,
      createdAt: new Date().toISOString(),
    };
  };
