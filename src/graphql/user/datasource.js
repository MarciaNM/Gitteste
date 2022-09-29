import { RESTDataSource } from 'apollo-datasource-rest';
import { makeUserDataLoader } from '../user/dataloaders';


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

  async getUser(id) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 0 },
    });
  }

  batchLoadById(id) {
    return this.dataLoader.load(id);
  }
}
