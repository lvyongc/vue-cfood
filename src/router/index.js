import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import {userInfo} from '@/service/api';
import Store from '@/store'

import Home from '@/views/home/Home.vue'

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
    // meta路径额外信息
    meta: {
      // 必须是登录状态才能访问该路由
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
    // 一级路由
    path: '/space',
    title: '个人空间',
    name: 'space',
    component: Space,
    // 重定向
    redirect: {
      name: 'works'
    },
    meta: {
      login: true
    },
    // 二级路由
    children: [
      {
        path: 'works',
        name: 'works',
        title: '作品',
        component: MenuList,
        meta: {
          login: true
        },
      },
      {
        path: 'fans',
        name: 'fans',
        title: '我的粉丝',
        component: Fans,
        meta: {
          login: true
        },
      },
      {
        path: 'following',
        name: 'following',
        title: '我的关注',
        component: Fans,
        meta: {
          login: true
        },
      },
      {
        path: 'collection',
        name: 'collection',
        title: '收藏',
        component: MenuList,
        meta: {
          login: true
        },
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


// 启动Router，传入一个对象，写路配置
const router = new Router({
  // 模式 hash 在地址栏后面加上# #home
  // history 不加# 直接把路由当做路径使用 /home
  mode: 'history',  // hash http://localhost:8081#home   http://localhost:8081/home
  // 路由配置，是数组，数组里是对象
  routes: [
    {
      // 路径
      path: '/',
      // 路由名字
      name: 'home',
      title: '首页',
      // 路径对应的组件
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      title: '登录页',
      component: Login,
      meta: {
        login: true
      },
    },

    // 其他的配置
    ...viewsRoute,

    {
      // 上面都不是，走这里
      path: '*',
      name: 'noFound',
      title: '未找到',
      // 重定向到home
      redirect: {
        name: 'home'
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {  // 去哪里，从哪里来，调用next去到to的位置，next决定是否进入
  // 拿到token
  const token = localStorage.getItem('token');
  const isLogin = !!token;
  console.log(to) // 通过to拿到配置的路由信息
  // 进入路由的时候，都要向后端发送token,验证合法不合法
  // 不管路由需要不需要登录，都需要展示用户信息
  // 都需要向后端发请求，拿到用户信息

  // 拿到用户信息
  const data = await userInfo();
  // 1、用户信息提交给仓库
  Store.commit('chnageUserInfo', data.data);
  // 1、判断
  if(to.matched.some(item => item.meta.login)){  // 需要登录，判断登录状态
    if(isLogin) {
      if(data.error === 400){  // 后端告诉你，登录没成功
        next({name: 'login'});
        localStorage.removeItem('token');
        return;
      }
      if(to.name === 'login'){
        // next 跳转页面
        next({name: 'home'})
      }else {
        next();
      }
      return;
    }
    // 没登录，进入login，直接进入
    if(!isLogin && to.name === 'login'){
      next();
    }
    // 没登录，进入的不是login，跳到login
    if(!isLogin && to.name !== 'login'){
      next({name: 'login'})
    }
    
    
  }else {
    next();
  }

  
})


export default router;