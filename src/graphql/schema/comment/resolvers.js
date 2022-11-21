import { DataSource } from "apollo-datasource";
import {checkIsLoggedIn} from '../login/utils/login-functions';

const createComment = async (_, {data}, {dataSources, loggedUserId}) =>  {
    checkIsLoggedIn(loggedUserId);
    const {postId, comment} = data;
    //console.log(postId, comment);

   const post = await dataSources.postApi.getPost(postId); // lança um erro se o post não existir

    return dataSources.comentDb.create({
        postId,
        comment,
        userId: loggedUserId,

    });
};
const user = async ({ user_id}, _,{dataSources}) => {
    const user = await dataSources.userApi.batchLoadById(user_id);
    return user;

};

export const commentResolvers = {
    Mutation: { createComment },
    Comment: { user },
};