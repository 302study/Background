import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import peopleManage from './views/nav1/peopleManage.vue'
import Form from './views/nav1/addMass.vue'
import user from './views/nav1/user.vue'
import activity from './views/nav2/activity.vue'
import editActivity from './views/nav2/editActivity.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import editMass from './views/nav1/editMass'
import addMass from "./views/nav1/addMass";
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },

    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '社团管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: '社团列表' },
            { path: '/form', component: peopleManage, name: '社团管理' },

            {
                path: '/editMass',
                component: editMass,
                name: '编辑社团' ,
                hidden: true
            },
            {
                path: '/addMass',
                component: addMass,
                name: '编辑社团' ,
                hidden: true
            },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '活动管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/activity', component: activity, name: '页面4' },
            { path: '/editActivity', component: editActivity, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '论坛管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/activity', component: activity, name: '页面4' },
            { path: '/editActivity', component: editActivity, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '个人管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;