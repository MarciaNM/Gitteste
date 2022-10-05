import { ValidationError } from 'apollo-server';


export const createPostFn = async (postData, DataSource) => {
  const postInfo = await createPostInfo(postData, DataSource);
  const { title, body, userId } = postInfo;

  if (!title || !body || !userId) {
    throw new ValidationError('you have to send title, body e userId');
  }
  return await DataSource.post('', { ...postInfo });
};
//criação do post update aula 47
export const updatePostFn = async (postId, postData, DataSource) => {
  if (!postId) {
    throw new ValidationError('Missing postId');
  }
  const postInfo = await createPostInfo(postData, DataSource);
  const { title, body, userId } = postInfo;

  if (typeof title !== 'undefined') {
    if (!title) {
      throw new ValidationError('title missing');

    }
  }
  if (typeof body !== 'undefined') {
    if (!body) {
      throw new ValidationError('body missing');
    }
  }
  if (typeof userId !== 'undefined') {
    if (!userId) {
      throw new ValidationError('userId missing');
    }
  }
  return DataSource.patch(postId, { ...postData });
};
// aula 48
export const deletePostFn = async (postId, DataSource) => {
  if (!postId) throw new ValidationError('Missing postId');

  const deleted = await DataSource.delete(postId);
  return !! deleted; // !! converte para boolean o delete
};

const userExists = async (userId, DataSource) => {
  try {
    console.log(DataSource.context.dataSources)
    // await DataSource.context.dataSources.userApi.get(userId);
  } catch (e) {
    // console.log(e)
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
