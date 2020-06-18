import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () =>
    import ('@/layout')
const Login = () =>
    import ('@/views/login')
const notFount = () =>
    import ('@/views/error404')
const Homepage = () =>
    import ('@/views/homepage/index.vue') //首页
const Competence = () =>
    import ('@/views/competence') //商机
    // const BusinessEdit = () => import('@/views/directBusiness/businessEdit')
    // const Client = () => import('@/views/client')//客户
const User = () =>
    import ('@/views/user') //任务
    // const Charge = () => import('@/views/manage/charge')
    // const Performance = () => import('@/views/performance/performance')//员工绩效
    // const Performance_rebates = () => import('@/views/performance/performance_rebates') //外部返佣
const Manage = () =>
    import ('@/views/manage') //管理
const Realname = () =>
    import ('@/views/examine/realName') //实名认证
const UserWithDrawal = () =>
    import ('@/views/examine/userWithdrawal') //用户提现审核
const AgentWithDrawal = () =>
    import ('@/views/examine/agentWithdrawal') //合伙人提现审核
const ReceiverCancel = () =>
    import ('@/views/examine/receiverCancel') //取消订单审核
const PosterCancel = () =>
    import ('@/views/examine/posterCancel') //取消订单审核
const OrderManage = () =>
    import ('@/views/orderManage') //订单管理
const TaskManage = () =>
    import ('@/views/taskManage') //订单管理
const PlatformMoney = () =>
    import ('@/views/moneyManage/platformMoney') //财务管理平台收入
const AgentMoney = () =>
    import ('@/views/moneyManage/agentMoney') //财务管理合伙人收入
const UserMoney = () =>
    import ('@/views/moneyManage/userMoney') //财务管理用户收入
const System = () =>
    import ('@/views/system') //系统管理
const Feedback = () =>
    import ('@/views/feedback') //意见反馈
const Revenue = () =>
    import ('@/views/revenue') //营收管理
const Pricereference = () =>
    import ('@/views/priceReference')
const Category = () =>
    import ('@/views/category') //类别
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/homepage',
        children: [{
                //这里之所以写name其实是给你自己看的，因为导航栏的内容是服务器加载的，和这里没关系
                path: 'homepage',
                name: '首页',
                component: Homepage
            },
            {
                path: 'competence',
                name: '权限管理',
                component: Competence
            },
            {
                path: 'user',
                name: '用户管理',
                component: User
            },
            {
                path: 'realname',
                name: '实名认证审核',
                component: Realname
            },
            {
                path: 'userWithdrawal',
                name: '用户提现审核',
                component: UserWithDrawal
            },
            {
                path: 'category',
                name: '类别管理',
                component: Category
            },
            {
                path: 'agentWithdrawal',
                name: '合伙人提现审核',
                component: AgentWithDrawal
            },
            {
                path: 'receiverCancel',
                name: '接单者取消订单审核',
                component: ReceiverCancel
            },
            {
                path: 'posterCancel',
                name: '发布者取消订单审核',
                component: PosterCancel
            },
            {
                path: 'orderManage',
                name: '订单管理',
                component: OrderManage
            },
            {
                path: 'taskManage',
                name: '任务管理',
                component: TaskManage
            },
            {
                path: 'platformMoney',
                name: '平台收入',
                component: PlatformMoney
            },
            {
                path: 'agentMoney',
                name: '合伙人收入',
                component: AgentMoney
            },
            {
                path: 'userMoney',
                name: '用户收入',
                component: UserMoney
            },
            {
                path: 'feedback',
                name: '意见反馈',
                component: Feedback
            },
            {
                path: 'system',
                name: '系统管理',
                component: System
            },
            {
                path: 'priceReference',
                name: '价格参考管理',
                component: Pricereference
            },
            {
                path: 'revenue',
                name: '营收管理',
                component: Revenue
            },
            {
                path: 'manage',
                name: '会员配置',
                component: Manage
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '*',
        name: 'notfount',
        component: notFount
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router