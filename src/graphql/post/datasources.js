import { RESTDataSource } from 'apollo-datasource-rest';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/posts/';
  }
  async gePosts(urlParams = {}) {
    return this.get('', urlParams);
  }
  async gePost(id) {
    return this.get(id);
  }
}
