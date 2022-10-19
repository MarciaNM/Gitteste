import { AuthenticationError, ValidationError } from 'apollo-server';
import { FetchError } from 'node-fetch';

export const createPostFn = async (postData, DataSource) => {
  const postInfo = await createPostInfo(postData, DataSource);
  const { userId } = postInfo;
  const { title, body } = postInfo;

  console.log(postInfo);

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
  const foundPost = await DataSource.get(postId, undefined, { // aula 66
    cacheOptions: { ttl: 0 },
  });

  if (!foundPost) { // aula 66
    throw new FetchError('Could not find the post you are looking for.');
  }
  if (foundPost.userId !== DataSource.context.loggedUserId) { // aula 66
    throw new AuthenticationError('You cannot update this post!');
  }

  console.log(foundPost);

  const { userId } = foundPost; // aula 66
  const { title, body } = postData;

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
    await userExists(userId, DataSource);
  }
  return DataSource.patch(postId, { ...postData });
};
// aula 48
export const deletePostFn = async (postId, DataSource) => {
  if (!postId) throw new ValidationError('Missing postId');

  const deleted = await DataSource.delete(postId);
  return !!deleted; // !! converte para boolean o delete
};

const userExists = async (userId, DataSource) => {
  try {
    console.log(DataSource.context.dataSources)
  } catch (e) {
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
