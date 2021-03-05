import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'
import { Message } from 'element-ui';
import {userInfo} from '@/service/api';

Vue.use(Router)

import Home from './views/home/Home.vue'

const Recipe = () => import( '@/views/recipe/recipe' );
const Create = () => import( '@/views/create/create' );
const Edit = () => import( '@/views/user-space/edit' );

const Space = () => import( /* webpackChunkName: "space" */ '@/views/user-space/space');

const MenuList = () => import( /* webpackChunkName: "space" */ '@/views/user-space/menu-list');
const Fans = () => import( /* webpackChunkName: "space" */ '@/views/user-space/fans');

const Detail = () => import( '@/views/detail/detail');
const Login = () => import( '@/views/user-login/index');

const viewsRoute = [
  {
    path: '/recipe',
    name: 'recipe',
    title: '菜谱大全',
    component: Recipe
  },
  {
    path: '/create',
    name: 'create',
    title: '发布菜谱',
    component: Create,
    meta: {
      login: true
    }
  },
  {
    path: '/edit',
    title: '编辑个人资料',
    name: 'edit',
    meta: {login: true},
    component: Edit
  },
  {
    path: '/space',
    title: '个人空间',
    name: 'space',
    component: Space,
    redirect: {
      name: 'works'
    },
    children: [
      {
        path: 'works',
        name: 'works',
        title: '作品',
        component: MenuList,
        meta: {
          login: true
        }
      },
      {
        path: 'fans',
        name: 'fans',
        title: '我的粉丝',
        component: Fans,
        meta: {
          login: true
        }
      },
      {
        path: 'following',
        name: 'following',
        title: '我的关注',
        component: Fans,
        meta: {
          login: true
        }
      },
      {
        path: 'collection',
        name: 'collection',
        title: '收藏',
        component: MenuList,
        meta: {
          login: true
        }
      }
    ]
  },
  {
    path: '/detail',
    name: 'detail',
    title: '菜谱细节',
    component: Detail
  }
]



const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        login: true
      }
    },
    ...viewsRoute,
    {
      path: '*',
      name: 'noFound',
      redirect: {
        name: 'home'
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  const userInfos = await userInfo();
  Store.commit('changeUserInfo', userInfos.data);
  if(to.matched.some(item => item.meta.login)){
    if(token){
      if(userInfos.error === 400){
        next({name: 'login'})
        localStorage.removeItem('token')
      }else {
        next();
      }
    }
    if(!token && to.name === 'login'){
      next();
    }
    if(!token && to.name !== 'login'){
      next({name: 'login'});
    }
    
    return;
  }
  next();
})

export default router;