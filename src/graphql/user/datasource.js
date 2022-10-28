import { RESTDataSource } from 'apollo-datasource-rest';
import { makeUserDataLoader } from './dataloaders';
import { createUserFn } from './utils/user-repository';
import { updateUserFn } from './utils/user-repository';
import { deleteUserFn } from './utils/user-repository';

export class UsersApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/users/';
    this.dataLoader = makeUserDataLoader(this.getUsers.bind(this));
  }

  async getUsers(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: { ttl: 0 },
    });
  }
  // inserido aula 50
  async createUser(data) {
    return createUserFn(data, this);

  }
  // aula 50
  async updateUser(userId, data) {
    return updateUserFn(userId, data, this);
  }

  // aula 50
  async deleteUser(userId) {
    return deleteUserFn(userId, this);
  }
  async getUser(id) {
   // console.log('getUser: ', id)
    return this.get(id, undefined, {
      cacheOptions: { ttl: 0 },
    });
  }


  batchLoadById(id) {
    return this.dataLoader.load(id);
  }
}
