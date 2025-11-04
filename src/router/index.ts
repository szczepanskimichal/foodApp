import {createRouter, createWebHistory} from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import MenuPage from '../pages/MenuPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import LocationPage from '../pages/LocationPage.vue';
import NotFoundPage from '../pages/404Page.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuPage,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
    {
      path: '/location',
      name: 'location',
      component: LocationPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404Page',
      component: NotFoundPage,
      meta: {
        title: '404 - Page Not Found'
      },
    },

  ],
});


router.beforeEach((to) => {
  if(to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;