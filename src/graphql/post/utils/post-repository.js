import { AuthenticationError, ValidationError } from 'apollo-server';
import { FetchError } from 'node-fetch';

export const createPostFn = async (postData, dataSources) => {
  const postInfo = await createPostInfo(postData, dataSources);
  const { title, body, userId } = postInfo;
  console.log(postInfo);

  if (!title || !body || !userId) {
    throw new ValidationError('You have to send title, body and userId');
  }

  return await dataSources.post('', { ...postInfo });
};
export const findPostOwner = async (postId, dataSources) => {
  const foundPost = await dataSources.getUsers(postId, undefined, {
    cacheOptions: { ttl: 0 },
  });

  if (!foundPost) {
    throw new FetchError('Could not find the post you are looking for.');
  }

  if (foundPost.userId !== dataSources.context.loggedUserId) {
    throw new AuthenticationError('You cannot update this post 😠!');
  }
  return foundPost;
};
export const updatePostFn = async (postId, postData, dataSources) => {
  if (!postId) {
    throw new ValidationError('Missing postId');
  }
  const { userId } = await findPostOwner(postId, dataSources);
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
    await userExists(userId, dataSources);
  }

  return dataSources.patch(postId, { ...postData });
};

export const deletePostFn = async (postId, dataSources) => {
  if (!postId) throw new ValidationError('Missing postId');
  await findPostOwner(postId, dataSources);

  const deleted = await dataSources.delete(postId);
  return !!deleted;
};

const userExists = async (userId, dataSources) => {
  try {
    await dataSources.context.DataSource.userApi.getUsers(userId);
  } catch (e) {
    throw new ValidationError(`User ${userId} does not exist`);
  }
};

const createPostInfo = async (postData, dataSources) => {
  const { title, body, userId } = postData;

  await userExists(userId, dataSources);

  const indexRefPost = await dataSources.getUsers('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
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
