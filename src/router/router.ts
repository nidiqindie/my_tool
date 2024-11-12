import { createRouter, createWebHistory } from "vue-router";
import Calculator from "@/page/Calculator.vue"
import Home from "@/page/home.vue"
 import bin2dec from "@/page/bin2dec.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      // name: 'home',
      meta: { title: '工具导航页' },
    },
    {
      path: '/home',
      component: Home,
      meta: { title: '工具导航页' },
    },
    {
      path: '/calculator',
      component: Calculator,
      meta: { title: '简单计算器' },
    },
    {
      path: '/bin2dec',
      component: bin2dec,
      meta: { title: '二转十进制' },
    },
  ],
})
// 设置网页标题
router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title.toString(); // 设置页面标题
  } else {
    document.title = '默认标题'; // 设置一个默认标题
  }
});
export default router

