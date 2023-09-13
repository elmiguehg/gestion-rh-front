import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from '../stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/workers',
      name: 'workers',
      component: () => import('../views/Workers/Index.vue')
    },
    {
      path: '/workers/edit/:id',
      name: 'workers.edit',
      component: () => import('../views/Workers/Edit.vue')
    },
    {
      path: '/workers/create',
      name: 'workers.create',
      component: () => import('../views/Workers/Create.vue')
    },
    {
      path: '/entities',
      name: 'entities',
      component: () => import('../views/Entities/Index.vue')
    },
    {
    path: '/workerbyentity',
    name: 'workerbyentity',
    component: () => import('../views/Entities/WorkerByEntity.vue')
    },
    {
      path: '/jobtitlebyentity',
      name: 'jobtitlebyentity',
      component: () => import('../views/Entities/JobtitleByEntity.vue')
      },
    {
    path: '/addjobtitle',
    name: 'addjobtitle',
    component: () => import('../views/Entities/AddJobtitle.vue')
    },
    {
      path: '/addworker',
      name: 'addworker',
      component: () => import('../views/Entities/AddWorker.vue')
      },
    {
      path: '/jobtitles',
      name: 'jobtitles',
      component: () => import('../views/Jobtitles/Index.vue')
    },
    {
      path: '/jobtitles/edit/:id',
      name: 'jobtitles.edit',
      component: () => import('../views/Jobtitles/Edit.vue')
    },
    {
      path: '/jobtitles/create',
      name: 'jobtitles.create',
      component: () => import('../views/Jobtitles/Create.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/Categories/Index.vue')
    },
  ]
})

router.beforeEach( async(to) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()
  if(authRequired && !auth.user){
    auth.returnUrl = to.fullPath
    return '/login'
  }
})

export default router
