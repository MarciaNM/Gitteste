
import { PubSub } from 'apollo-server';
import { checkIsLoggedIn } from '../login/utils/login-functions';

export const pubSub = new PubSub(); // classe instanciada do PubSub
export const CREATED_COMMENT_TRIGGER = 'CREATE_COMMENT';

const createComment = async (_, { data }, { dataSources, loggedUserId }) => {
    checkIsLoggedIn(loggedUserId);
    const { postId, comment } = data;
    //console.log(postId,comment);

    const post = await dataSources.postApi.getPost(postId);

    return dataSources.commentDb.create({
        postId,
        comment,
        userId: loggedUserId,

    });

 };

const user = async ({ user_id}, _, { dataSources }) => {
    const user = await dataSources.userApi.batchLoadById(user_id);
    return user;
};

const createdComment = {   
    subscribe: () => {
    // subscribe: (parentObj, args, context) => {
    //console.log('PARENT', parentObj);
    //onsole.log('ARGS', args);
    //console.log('CTX', context);
    return pubSub.asyncIterator(CREATED_COMMENT_TRIGGER); // aula 92 e 93
},

};

export const commentResolvers = {
    Mutation: { createComment },
    Subscription: { createdComment},    
    Comment: { user },
};
