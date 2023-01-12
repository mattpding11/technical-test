import { createRouter, createWebHistory } from 'vue-router'
import Characters from '../views/Characters.vue'
import CharacterDetail from '../views/CharacterDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/character',
      name: 'character',
      component: Characters
    },
    {
      path: '/character/:id',
      name: 'characterDetail',
      component: CharacterDetail,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    },
    {
        path: "/:pathxatch(.*)*",
        redirect: "/character"    
    }
  ]
})

export default router
