import { RESTDataSource } from 'apollo-datasource-rest';
import { makePostDataLoader } from '../post/dataloaders';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/posts/';
    this.dataLoader = makePostDataLoader(this.getPosts.bind(this));
  }
  async getPosts(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: { ttl: 0 },
    });
  }
  async getPost(id) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 0 },
    });
  }
  batchLoadByUserId(id) {
    return this.dataLoader.load(id);
  }
}
