// Imports
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/home/Index.vue'),
      children: [
        {
          path: '',
          name: '主页',
          component: () => import('@/views/home/Index.vue'),
        },
        {
          path: 'ranking',
          name: '天梯榜',
          component: () => import('@/views/ranking/Index.vue'),
        },
      ],
    },

  ],
})

export default router
