
import { checkIsLoggedIn } from '../login/utils/login-functions';

const createComment = async (_, { data }, { dataSouces, loggedUserId }) => {
    checkIsLoggedIn(loggedUserId);
    const { postId, comment } = data;
    console.log(postId,comment);

    const post = await dataSouces.postApi.getPost(postId);

    return dataSouces.commentDb.create({
        postId,
        comment,
        userId: loggedUserId,

    });

 
};

const user = async ({ user_id}, _, { dataSouces }) => {
    const user = await dataSouces.userApi.batchLoadById(user_id);
    return user;
};
export const commentResolvers = {
    Mutation: { createComment },
    Comment: {user},
};