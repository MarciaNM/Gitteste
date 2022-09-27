import { RESTDataSource } from 'apollo-datasource-rest';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/posts/';
  }
  async getPosts(URLParams = {}) {
    return this.get('', URLParams, {
      cacheOptions: { ttl: 60 },
    });
  }
  async getPost(id) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 60 },
    });
  }
}
