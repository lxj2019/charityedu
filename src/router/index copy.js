import Vue from 'vue'
import VueRouter from "vue-router"


//导入组件

const Home = () =>
    import ("../views/home/Home")
const Profile = () =>
    import ("../views/profile/Profile")
const Login = () =>
    import ("../views/login/Login")
const NotFound = () =>
    import ('@/views/notFound/NotFound')
const Register = () =>
    import ('../views/login/Register')
const Forgetpasswd = () =>
    import ('../views/login/Forgetpasswd')
const PersonalInfo = () =>
    import ('@/views/profile/ProfileShow/PersonalInfo')
const ModifyPwd = () =>
    import ('@/views/profile/ProfileShow/ModifyPwd')
const Collections = () =>
    import ('@/views/profile/ProfileShow/student/Collections')
const Achievements = () =>
    import ('@/views/profile/ProfileShow/teacher/Achievements')
const MyClass = () =>
    import ('@/views/profile/ProfileShow/teacher/MyClass')
const UploadWorks = () =>
    import ('@/views/profile/ProfileShow/teacher/UploadWorks')
const AdminCheck = () =>
    import ('@/views/profile/ProfileShow/admin/AdminCheck')
const CourseList = () =>
    import ('@/views/courseList/CourseList')
const Video = () =>
    import ('@/views/video/Video')
const AssessCheck = () =>
    import ('@/views/profile/ProfileShow/admin/AssessCheck')
const LoopManager = () =>
    import ('@/views/profile/ProfileShow/admin/LoopManager')

Vue.use(VueRouter)

const routes = [{
        path: '',
        redirect: '/home',
    },
    {
        path: '/home',
        component: Home,
        meta: {
            title: "惠师惠学"
        }
    },
    {
        path: '/courseList/:id',
        component: CourseList,
        meta: {
            title: "课程列表"
        },
    },
    {
        path: '/video/:id',
        component: Video,
        meta: {
            title: "视频播放"
        },
    },
    {
        path: '/assessCheck/:id',
        component: AssessCheck,
        meta: {
            title: "视频审核"
        },
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            title: "个人"
        },
        children: [{
                path: '',
                redirect: 'personalInfo',
            },
            {
                path: 'personalInfo',
                component: PersonalInfo,
                meta: {
                    title: "个人信息"
                }
            },
            {
                path: 'collections',
                component: Collections,
                meta: {
                    title: "我的收藏"
                }
            },
            {
                path: 'achievements',
                component: Achievements,
                meta: {
                    title: "我的成就"
                }
            },
            {
                path: 'modifyPwd',
                component: ModifyPwd,
                meta: {
                    title: "修改密码"
                }
            },
            {
                path: 'myClass',
                component: MyClass,
                meta: {
                    title: "我的课堂"
                }
            },
            {
                path: 'uploadWorks',
                component: UploadWorks,
                meta: {
                    title: "上传视频"
                }
            },
            {
                path: 'loopManager',
                component: LoopManager,
                meta: {
                    title: "轮播图管理"
                }
            },
            {
                path: 'checkWorks',
                component: AdminCheck,
                meta: {
                    title: "评分审核"
                },
            }
        ]

    },

    {
        path: '/login',
        component: Login,
        meta: {
            title: "登陆界面"
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            title: "注册界面"
        }
    },
    {
        path: '/forgetpasswd',
        component: Forgetpasswd,
        meta: {
            title: "找回密码界面"
        }
    },
    {
        path: '/404',
        component: NotFound,
    },
    {
        path: '*',
        component: NotFound
    }
]

const router = new VueRouter({
    routes,
    linkActiveClass: "active",
    mode: 'history'
})
router.beforeEach((to, from, next) => {
    document.title = to.matched[0].meta.title;
    next();
})
export default router