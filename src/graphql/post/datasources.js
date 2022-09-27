import { RESTDataSource } from 'apollo-datasource-rest';
// eslint-disable-next-line no-unused-vars
import { URLSearchParams } from 'url';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/posts/';
  }
  async getPosts(URLSearchParams = {}) {
    return this.get('', URLSearchParams, {
      cacheOptions: { ttl: 60 },
    });
  }
  async getPost(id) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 60 },
    });
  }
}
