import { ValidationError } from 'apollo-server-errors';
import {SQLDataSource} from '../../datasources/sql/sql-datasource';

const commentReducer = (comment) => {
    return {
        id: comment.id,
        comment: comment.comment,
        user_id: comment.user_id,
        createdAt: new Date(comment.created_at).toDateString()

    };
};

export class CommentSQLDatasource extends SQLDataSource {
    async getById(id) {
      return this.db('comments').where('id', '=', id); //this.db leia com knex

    }

    async getByPostId(post_id) { 
      const query = this.db('comments').where({post_id});
      const comments = await query;
      console.log(querytoString());
      return comments.map((comment) => commentReducer(comment));  
    }
    async create ({ userId, postId, comment}) {
     const partialComment = {
         user_id: userId,
         post_id: postId,
         comment,
    };    
    const exists = await this.db('comments').where(partialComment);
        if (exists.lenght > 0) {
            throw new ValidationError ('Comment already created');
    }

    
    const created = await this.db('comments').insert(partialComment);

    return {
        id: created[0],
        createdAt: new Date().toISOString(),
         ...partialComment,

     };  
 }   
}
