import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/views/layout/index.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: layout,
      children: [
        {
          path: 'chat',
          name: 'chat',
          component: () => import('@/views/chat/index.vue'),
          meta: {
            title: '智能客服服务系统'
          }
        },
        {
          path: 'single_page',
          name: 'single_page',
          component: () => import('@/views/singlePage/index.vue'),
          meta: {
            title: '单页内容管理'
          }
        },
        {
          path: 'user_manage',
          name: 'user_manage',
          component: () => import('@/views/userManage/index.vue'),
          meta: {
            title: '注册用户管理'
          }
        },
        {
          path: 'qa_list',
          name: 'qa_list',
          component: () => import('@/views/qaList/index.vue'),
          meta: {
            title: '国内问题管理'
          }
        },
        {
          path: 'oversea_service',
          name: 'oversea_service',
          component: () => import('@/views/overseasService/index.vue'),
          meta: {
            title: '海外客服中心'
          }
        },
        {
          path: 'foreign_qa_list',
          name: 'foreign_qa_list',
          component: () => import('@/views/qaList/index.vue'),
          meta: {
            title: '海外问题管理'
          }
        },
        {
          path: 'service_rate',
          name: 'service_rate',
          component: () => import('@/views/serviceRate/index.vue'),
          meta: {
            title: '客服评分'
          }
        },
        {
          path: 'service_count',
          name: 'service_count',
          component: () => import('@/views/serviceCount/index.vue'),
          meta: {
            title: '客服服务统计'
          }
        },
        {
          path: 'service_key',
          name: 'service_key',
          component: () => import('@/views/serviceKey/index.vue'),
          meta: {
            title: '客服服务字段管理'
          }
        },
        {
          path: 'smart',
          name: 'smart',
          component: () => import('@/views/smart/index.vue'),
          meta: {
            title: '机器人客服'
          }
        },
        {
          path: 'ad_manage',
          name: 'ad_manage',
          component: () => import('@/views/adManage/index.vue'),
          meta: {
            title: '广告管理'
          }
        },
        {
          path: 'drive_manage',
          name: 'drive_manage',
          component: () => import('@/views/driveManage/index.vue'),
          meta: {
            title: '驱动管理'
          }
        },
        {
          path: 'drive_manage',
          name: 'drive_manage',
          component: () => import('@/views/driveManage/index.vue'),
          meta: {
            title: '驱动管理'
          }
        },
        {
          path: 'manual_manage',
          name: 'manual_manage',
          component: () => import('@/views/manualManage/index.vue'),
          meta: {
            title: '驱动管理'
          }
        },
        {
          path: 'order_manage',
          name: 'order_manage',
          component: () => import('@/views/orderManage/index.vue'),
          meta: {
            title: '产品订单管理'
          }
        },
        {
          path: 'key_manage',
          name: 'key_manage',
          component: () => import('@/views/keyManage/index.vue'),
          meta: {
            title: '密钥库管理'
          }
        },
        {
          path: 'device_manage',
          name: 'device_manage',
          component: () => import('@/views/deviceManage/index.vue'),
          meta: {
            title: '设备信息管理'
          }
        },
        {
          path: 'role_manage',
          name: 'role_manage',
          component: () => import('@/views/roleManage/index.vue'),
          meta: {
            title: '系统角色管理'
          }
        },
        {
          path: 'admin_manage',
          name: 'admin_manage',
          component: () => import('@/views/adminManage/index.vue'),
          meta: {
            title: '管理员账号'
          }
        },
        {
          path: 'address',
          name: 'address',
          component: () => import('@/views/address/index.vue'),
          meta: {
            title: '地区数据管理'
          }
        },
        {
          path: 'upgrade',
          name: 'upgrade',
          component: () => import('@/views/upgradeManage/index.vue'),
          meta: {
            title: '升级包管理'
          }
        },
        {
          path: 'system_config',
          name: 'system_config',
          component: () => import('@/views/systemConfig/index.vue'),
          meta: {
            title: '密钥刷新配置'
          }
        }
      ]
    },
    {
      path: '/home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '智能客服管理系统'
      }
    },
    {
      path: '/login',
      redirect: '/login/index',
      component: () => import('@/views/login/index.vue'),
      children: [
        {
          path: 'index',
          name: 'login',
          component: () => import('@/views/login/login.vue'),
          meta: {
            title: '登录'
          }
        }
        // {
        //   path: 'register',
        //   name: 'register',
        //   component: () => import('@/views/login/register.vue'),
        //   meta: {
        //     title: '注册'
        //   }
        // }
      ]
    }
    /*
     * {
     *   path: '/status',
     *   name: 'status',
     *   component: () => import('@/views/status/index.vue'),
     *   meta: {
     *     title: '编辑状态'
     *   }
     * },
     * {
     *   path: '/user_info',
     *   name: 'userInfo',
     *   component: () => import('@/views/userInfo/index.vue'),
     *   meta: {
     *     title: '用户资料'
     *   }
     * },
     * {
     *   path: '/history_qa',
     *   name: 'historyQa',
     *   component: () => import('@/views/historyQa/index.vue'),
     *   meta: {
     *     title: '用户资料'
     *   }
     * },
     * {
     *   path: '/session_transfer',
     *   name: 'sessionTransfer',
     *   component: () => import('@/views/sessionTransfer/index.vue'),
     *   meta: {
     *     title: '会话转接'
     *   }
     * },
     * {
     *   path: '/session_over',
     *   name: 'sessionOver',
     *   component: () => import('@/views/sessionOver/index.vue'),
     *   meta: {
     *     title: '结束会话'
     *   }
     * },
     * {
     *   path: '/session_over/type',
     *   name: 'sessionOverType',
     *   component: () => import('@/views/sessionOver/type.vue'),
     *   meta: {
     *     title: '结束会话'
     *   }
     * },
     * {
     *   path: '/chatroom',
     *   name: 'chatroom',
     *   component: () => import('@/views/chatroom/index.vue'),
     *   meta: {
     *     title: '正在聊天'
     *   }
     * }
     */
  ]
})

export default router
