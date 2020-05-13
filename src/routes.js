import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import peopleManage from './views/nav1/peopleManage.vue'
import activity from './views/nav2/activity.vue'
import editActivity from './views/nav2/editActivity.vue'
import addActivity from "./views/nav2/addActivity";
import user from './views/nav3/user.vue'
import editUser from './views/nav3/editUser.vue'
import applyMass from "./views/nav1/applyMass";
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
            { path: '/applyMass', component: applyMass, name: '社团申请表' },
            {
                path: '/editMass',
                component: editMass,
                name: '编辑社团' ,
                hidden: true
            },
            {
                path: '/addMass',
                component: addMass,
                name: '新增社团' ,
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
            { path: '/activity', component: activity, name: '活动列表' },
            {
                path: '/editActivity',
                component: editActivity,
                name: '编辑活动' ,
                hidden: true
            },
            {
                path: '/addActivity',
                component: addActivity,
                name: '新增活动' ,
                hidden: true
            },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/user', component: user, name: '用户列表' },
            { path: '/editUser', component: editUser, name: '编辑用户', hidden: true },
        ]
    },

    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;