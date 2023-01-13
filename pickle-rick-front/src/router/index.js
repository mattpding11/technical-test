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
        path: "/:pathxatch(.*)*",
        redirect: "/character"    
    }
  ]
})

export default router
