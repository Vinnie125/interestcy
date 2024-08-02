import { UserController } from './controller/UserController';
import { InterestGroupController } from './controller/InterestGroupController';

export const routes = [
  {
    controller: UserController,
    path: '/api',
    routes: [
      { method: 'post', path: '/login', action: 'login' },
      { method: 'post', path: '/register', action: 'register' },
    ],
  },
  {
    controller: InterestGroupController,
    path: '/api/groups',
    routes: [
      { method: 'post', path: '/create', action: 'create' },
      { method: 'get', path: '/list', action: 'list' },
    ],
  },
];
