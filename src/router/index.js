import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pricing from '../views/Pricing.vue'
import Gallery from '../views/Gallery.vue'
import Terms from '../views/Terms.vue'
import Contact from '../views/Contact.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/pricing', name: 'Pricing', component: Pricing },
  { path: '/gallery', name: 'Gallery', component: Gallery },
  { path: '/terms', name: 'Terms', component: Terms },
  { path: '/contact', name: 'Contact', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
