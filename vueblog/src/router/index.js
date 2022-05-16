import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Login from '../views/Login.vue'
import HomePage from '../views/HomePage.vue'
import PersonalCenter from '../views/PersonalCenter.vue'
import Blog from '../views/Blog.vue'
import BlogEdit from '../views/BlogEdit.vue'
import EditPersonalInfo from '../views/EditPersonalInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/PersonalCenter',
    name: 'PersonalCenter',
    component: PersonalCenter
  },
  {
    path: '/Blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/BlogEdit',
    name: 'BlogEdit',
    component: BlogEdit
  },
  {
    path: '/PersonalCenter/EditPersonalInfo',
    name: 'EditPersonalInfo',
    component: EditPersonalInfo
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
