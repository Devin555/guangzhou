import Vue from 'vue'
import Router from 'vue-router'
// 首页
import Login from '@/views/login'
import Main from '@/views/main'
import HomePage from '@/views/homePage/homePage'
import Search from '@/views/data/search'
import Statistics from '@/views/data/dataStatistics'
import Warning from '@/views/data/warning'
import Control from '@/views/facilities/control'
import ShebeiControl from '@/views/facilities/shebeiControl'
import Sbzs from '@/views/facilities/sbzs'
import Daily from '@/views/facilities/daily'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        }, {
            path: '/login',
            component: Login
        }, {
            path: '/main',
            name: 'main',
            component: Main,
            children: [
                {
                    path: '/main/homePage',
                    name: 'homePage',
                    component: HomePage,
                },
                {
                    path: '/main/search',
                    name: 'search',
                    component: Search,
                },
                {
                    path: '/main/dataStatistics',
                    name: 'dataStatistics',
                    component: Statistics,
                },
                {
                    path: '/main/warning',
                    name: 'warning',
                    component: Warning,
                },
                {
                    path: '/main/control',
                    name: 'control',
                    component: Control,
                },
                {
                    path: '/main/shebeiControl',
                    name: 'shebeiControl',
                    component: ShebeiControl,
                },
                {
                    path: '/main/sbzs',
                    name: 'sbzs',
                    component: Sbzs,
                },
                {
                    path: '/main/daily',
                    name: 'daily',
                    component: Daily,
                }
            ]
        }
    ]
})

const whiteList = ['/login'];// 不重定向白名单
router.beforeEach((to, from, next) => {
    let token = window.localStorage.getItem('TOKEN');
    if (token == null || token == "" || token == undefined) {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login');
        }
    } else {
        next()
    }
});

export default router;
