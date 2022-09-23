import fetch from 'node-fetch';
import { makeUserDataLoader } from './dataloaders';
import { getUsers } from './user/utils';

const API_URL = process.env.API_URL;

export const context = () => {
  return {
    import fetch from 'node-fetch';
    userDataLoader: makeUserDataLoader(getUsers(fetch)),
    getUsers: getUsers(fetch),
    getPosts: (path = '/') => fetch(API_URL + '/posts' + path),
  };
};
