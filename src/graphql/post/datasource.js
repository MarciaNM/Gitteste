import { RESTDataSource } from 'apollo-datasource-rest';
import { makePostDataLoader } from '../post/dataloaders';
import { createPostFn } from './utils/post-repository';
import { updatePostFn } from './utils/post-repository';
import { deletePostFn } from './utils/post-repository'

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/posts/';
    this.dataLoader = makePostDataLoader(this.getPosts.bind(this));
  }
  async getPosts(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: { ttl: 10 },
    });
  }
  async getPost(id) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 10 },
    });
  }
  async createPost(postData) {
    // console.log(postData)
    return createPostFn(postData, this);

  }
  // aula 47
  async updatePost(postId, postData) {
    return updatePostFn(postId, postData, this);
  }

  // aula 48
  async deletePost(postId) {
    return deletePostFn(postId, this);
  }

  batchLoadById(id) {
    return this.dataLoader.load(id);
  }
}
