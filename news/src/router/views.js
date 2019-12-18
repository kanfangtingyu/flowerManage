const login = () => import('@/views/login/login.vue')

const BaseFrame = () => import('@/views/BaseFrame/BaseFrame.vue')

export default [
  {
    path: '/',
    redirect: '/base-frame'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/base-frame',
    name: 'BaseFrame',
    component: BaseFrame
  }
]
