
import { PubSub, withFilter} from 'apollo-server';
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
        postOwner: post?.userId || null,

    });

 };

const user = async ({ user_id}, _, { dataSources }) => {
    const user = await dataSources.userApi.batchLoadById(user_id);
    return user;
};

const createdComment = {   
    subscribe: withFilter( // aula 95
    () => {
    //subscribe: (parentObj, args, context) => {
    //console.log('PARENT', parentObj);
    //console.log('ARGS', args);
    //console.log('CTX', context);
    return pubSub.asyncIterator(CREATED_COMMENT_TRIGGER); // aula 92 e 93
    },
    (payload, _, context) => {
        console.log('PAYLOAD', payload.postOwner);
        console.log('CTX', context);
        console.log('CONDIÇAO', payload.postOwner === context.loggedUserId);
        const hasPostOwner = payload.postOwner !== null;
        const postOwnerIsLoggedUser =  payload.postOwner === context.loggedUserId;
        const shouldNotifyUser = hasPostOwner && postOwnerIsLoggedUser;
        return shouldNotifyUser;
    },
    ),

};

export const commentResolvers = {
    Mutation: { createComment },
    Subscription: { createdComment},    
    Comment: { user },
};
