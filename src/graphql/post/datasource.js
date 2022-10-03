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
      cacheOptions: { ttl: 00 },
    });
  }
  async getPost(id) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 00 },
    });
  }
  async createPost(postData) {
    return createPostFn(postData, this);

  }

  batchLoadById(id) {
    return this.dataLoader.load(id);
  }
}
