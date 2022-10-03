import { ValidationError } from 'apollo-server';

export const createPostFn = async (postData, DataSource) => {
  const postInfo = await createPostInfo(postData, DataSource);
  const { title, body, userId } = postInfo;

  if ( !title || !body || !userId ) {
    throw new ValidationError('you have to send title, body e userId');
  }
  return await DataSource.post('', { ...postInfo });
};

const userExists = async (userId, DataSource) => {
  try {
    console.log(DataSource.context.dataSources)
    await DataSource.context.dataSources.userApi.get(userId);
  } catch (e) {
    console.log(e)
    throw new ValidationError(`User ${userId} does not exist`);
  }
};

const createPostInfo = async (postData, DataSource) => {
  const { title, body, userId } = postData;

  await userExists(userId, DataSource);

  const indexRefPost = await DataSource.get('', {
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
