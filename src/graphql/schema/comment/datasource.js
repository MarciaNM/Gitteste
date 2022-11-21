import { ValidationError } from 'apollo-server';
import {SQLDataSource} from '../../datasources/sql/sql-datasource';

export class CommentSQLDatasource extends SQLDataSource {
    async getById(id) {
      return this.db('comments').where('id', '=', id); //this.db leia com knex

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
