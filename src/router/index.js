import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import CreateRoom from '@/views/CreateRoom';
import Room from '@/views/Room';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/room/create',
    name: 'CreateRoom',
    component: CreateRoom,
  },
  {
    path: '/room/:id',
    name: 'Room',
    component: Room,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
