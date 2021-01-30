import Vue from 'vue'
import VueRouter from "vue-router"


Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () =>
      import ("@/views/home"),
    meta: {
      title: "惠师惠学"
    }
  },
  {
    path: '/courseList/:id',
    component: () =>
      import ("@/views/courseList"),
    meta: {
      title: "课程列表"
    },
  },
  {
    path: '/work/:id',
    name: 'work',
    component: () =>
      import ("@/views/work/index"),
    meta: {
      title: "课程展示"
    },
  },
  {
    path: '/profile',
    component: () =>
      import ("@/views/profile"),
    meta: {
      title: "个人"
    },
    children: [{
        path: '',
        redirect: 'personalInfo',
      },
      {
        path: 'personalInfo',
        component: () =>
          import ("@/views/profile/userInfo"),
        meta: {
          title: "个人信息"
        }
      },
      {
        path: 'collections',
        component: () =>
          import ("@/views/profile/myCollections"),
        meta: {
          title: "我的收藏"
        }
      },

      {
        path: 'avatar',
        component: () =>
          import ("@/views/profile/avatar"),
        meta: {
          title: "我的头像"
        }
      },
      {
        path: 'myCollections',
        component: () =>
          import ("@/views/profile/myCollections"),
        meta: {
          title: "我的收藏"
        }
      },
      {
        path: 'achievements',
        component: () =>
          import ("@/views/profile/achievements"),
        meta: {
          title: "我的成就"
        }
      },
      {
        path: 'modify-passwork',
        component: () =>
          import ("@/views/profile/modifyPassword"),
        meta: {
          title: "修改密码"
        }
      },
      {
        path: 'myClass',
        component: () =>
          import ("@/views/profile/myClass"),
        meta: {
          title: "我的课堂"
        }
      },
      {
        path: 'workUpload',
        component: () =>
          import ("@/views/profile/workUpload"),
        meta: {
          title: "作品上传"
        }
      },
      {
        path: 'loopManage',
        component: () =>
          import ("@/views/profile/loop"),
        meta: {
          title: "轮播图管理"
        }
      },
      {
        path: 'workCheck',
        component: () =>
          import ("@/views/profile/workCheck"),
        meta: {
          title: "作品审核"
        },
      }
    ]

  },

  {
    path: '/login',
    component: () =>
      import ('@/views/login/index'),
    meta: {
      title: "登陆"
    }
  },
  {
    path: '/register',
    component: () =>
      import ("@/views/register/index"),
    meta: {
      title: "注册"
    }
  },
  {
    path: '/forget-password',
    component: () =>
      import ("@/views/forgetPassword/index"),
    meta: {
      title: "找回密码"
    }
  },
  {
    path: '/404',
    component: () =>
      import ("@/views/404/index"),
    meta: {
      title: "404"
    }
  },
  {
    path: '*',
    component: () =>
      import ("@/views/404/index"),
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: "active",
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title;
  next();
})
export default router