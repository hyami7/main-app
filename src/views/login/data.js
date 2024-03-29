export const loginData = {
  user: {
    id: '1',
    mcId: '1',
    mcCode: '1003',
    mcName: '商户1',
    account: 'root',
    username: 'zhangsan',
    phone: '13711111111',
    email: '1090116461@qq.com',
    lastLoginIp: '127.0.0.1',
    lastLoginTime: '2024-01-16 13:37:23',
    permissions: [
      'job:sysJob',
      'userInfo',
      'bank:accountDetail',
      'bank:bankBankControlFlow',
      'bank:traceView',
      'bankInterInfo',
      'bank:bankAccountList',
      'loginLog',
      'bank:orderDetail',
      'bankAccountList',
      'bankTemplateConfig',
      'checkBill',
      'testInter',
      'dashboard',
      'bank:trace',
      'bank:testInter',
      'bank:receipt',
      'merchantFrontInterVersion',
      'bank:checkBill',
      'traceView',
      'log:loginLog',
      'sysJob',
      'dashboard:index',
      'bankBankControlFlow',
      'bank:bankInterInfo',
      'bankAccountDetail',
      'mcOpenBank:saveOrUpdate',
      'bankAccountBalance',
      'bankDict',
      'sysConfig:userInfo',
      'mcSecretKey',
      'merchant:opLog',
      'merchant:mcFrontOpenInterVersion',
      'bank:order',
      'openBank',
      'merchant:openBank',
      'trace',
      'bank:accountBalance',
      'bankFront',
      'bankClient',
      'bank:dict',
      'bankOrder',
      'merchant:secretKey',
      'opLog',
      'merchant:bankClient',
      'bank:bankTemplateConfig',
      'merchant:bankFront',
      'orderDetail',
      'bankReceipt',
    ],
    roles: [
      {
        id: '4',
        roleName: '商户管理员',
        roleKey: 'MC_ADMIN',
        roleSort: '0',
        dataScope: '1',
        remark: '商户管理员',
        menuIds: null,
        userIds: null,
        createBy: '超级管理员',
        updateBy: '',
        createTime: '2023-08-03T13:15:30.000+00:00',
        updateTime: '2023-08-03T13:35:55.000+00:00',
      },
    ],
    menus: [
      {
        appKey: 'SYS_APP',
        appName: '系统应用',
        tree: [
          {
            id: '21',
            title: '控制台',
            pid: '0',
            orderNum: '1000',
            path: 'dashboard/index',
            menuType: 'tab',
            type: 'menu',
            name: 'dashboard',
            visible: '0',
            cacheSupported: '1',
            perms: 'dashboard',
            icon: 'fa fa-dashboard',
            remark: '',
            children: [],
            appKey: 'SYS_APP',
            createBy: 'zhangsan',
            updateBy: 'zhangsan',
            createTime: '2023-12-26T08:18:50.000+00:00',
            updateTime: '2023-12-26T08:18:50.000+00:00',
          },
          {
            id: '22',
            title: '商户基础配置',
            pid: '0',
            orderNum: '980',
            path: 'merchant/secretKey',
            menuType: 'tab',
            type: 'menu',
            name: 'mcSecretKey',
            visible: '0',
            cacheSupported: '1',
            perms: 'mcSecretKey',
            icon: 'fa fa-compass',
            remark: '',
            children: [],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '超级管理员',
            createTime: '2023-11-03T02:38:59.000+00:00',
            updateTime: '2023-11-03T02:38:59.000+00:00',
          },
          {
            id: '10',
            title: '银行参数配置',
            pid: '0',
            orderNum: '970',
            path: 'merchant/openBank',
            menuType: 'tab',
            type: 'menu',
            name: 'openBank',
            visible: '0',
            cacheSupported: '1',
            perms: 'openBank',
            icon: 'fa fa-institution',
            remark: '',
            children: [
              {
                createBy: '超级管理员',
                updateBy: '',
                createTime: '2023-08-09 17:15:13',
                updateTime: null,
                id: '37',
                title: '开通银行-保存',
                pid: '10',
                orderNum: '0',
                path: '#',
                menuType: 'tab',
                type: 'button',
                name: null,
                visible: '0',
                cacheSupported: '1',
                perms: 'mcOpenBank:saveOrUpdate',
                icon: null,
                remark: '',
                children: [],
                appKey: 'SYS_APP',
              },
            ],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '',
            createTime: '2023-08-02T09:37:31.000+00:00',
            updateTime: '2023-08-04T01:33:19.000+00:00',
          },
          {
            id: '11',
            title: '银行账户管理',
            pid: '0',
            orderNum: '960',
            path: 'bank/bankAccountList',
            menuType: 'tab',
            type: 'menu',
            name: 'bankAccountList',
            visible: '0',
            cacheSupported: '1',
            perms: 'bankAccountList',
            icon: 'fa fa-credit-card',
            remark: '',
            children: [],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '',
            createTime: '2023-08-02T09:38:41.000+00:00',
            updateTime: '2023-08-04T01:30:17.000+00:00',
          },
          {
            id: '13',
            title: '客户端管理',
            pid: '0',
            orderNum: '950',
            path: 'merchant/bankClient',
            menuType: 'tab',
            type: 'menu',
            name: 'bankClient',
            visible: '0',
            cacheSupported: '1',
            perms: 'bankClient',
            icon: 'fa fa-tasks',
            remark: '',
            children: [],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '',
            createTime: '2023-05-02T09:41:29.000+00:00',
            updateTime: '2023-08-04T01:30:38.000+00:00',
          },
          {
            id: '12',
            title: '前置机管理',
            pid: '0',
            orderNum: '940',
            path: 'merchant/bankFront',
            menuType: 'tab',
            type: 'menu',
            name: 'bankFront',
            visible: '0',
            cacheSupported: '1',
            perms: 'bankFront',
            icon: 'fa fa-road',
            remark: '',
            children: [],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '',
            createTime: '2023-08-02T09:40:21.000+00:00',
            updateTime: '2023-08-10T08:31:10.000+00:00',
          },
          {
            id: '19',
            title: '调度管理',
            pid: '0',
            orderNum: '930',
            path: 'job/sysJob',
            menuType: 'tab',
            type: 'menu',
            name: 'sysJob',
            visible: '0',
            cacheSupported: '1',
            perms: 'sysJob',
            icon: 'fa fa-clock-o',
            remark: '',
            children: [],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '',
            createTime: '2023-08-02T09:46:47.000+00:00',
            updateTime: '2023-08-04T02:08:38.000+00:00',
          },
          {
            id: '14',
            title: '交易指令',
            pid: '0',
            orderNum: '920',
            path: 'bank/order',
            menuType: 'tab',
            type: 'menu',
            name: 'order',
            visible: '0',
            cacheSupported: '1',
            perms: 'bankOrder',
            icon: 'fa fa-location-arrow',
            remark: '',
            children: [],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '超级管理员',
            createTime: '2024-01-11T01:13:10.000+00:00',
            updateTime: '2024-01-11T01:13:10.000+00:00',
          },
          {
            id: '16',
            title: '账户余额',
            pid: '0',
            orderNum: '910',
            path: 'bank/accountBalance',
            menuType: 'tab',
            type: 'menu',
            name: 'accountBalance',
            visible: '0',
            cacheSupported: '1',
            perms: 'bankAccountBalance',
            icon: 'fa fa-dollar',
            remark: '',
            children: [],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '超级管理员',
            createTime: '2024-01-04T10:13:00.000+00:00',
            updateTime: '2024-01-04T10:13:00.000+00:00',
          },
          {
            id: '17',
            title: '账户明细',
            pid: '0',
            orderNum: '900',
            path: 'bank/accountDetail',
            menuType: 'tab',
            type: 'menu',
            name: 'accountDetail',
            visible: '0',
            cacheSupported: '1',
            perms: 'bankAccountDetail',
            icon: 'fa fa-list-ol',
            remark: '',
            children: [],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '超级管理员',
            createTime: '2024-01-04T09:58:28.000+00:00',
            updateTime: '2024-01-04T09:58:28.000+00:00',
          },
          {
            id: '15',
            title: '电子回单',
            pid: '0',
            orderNum: '890',
            path: 'bank/receipt',
            menuType: 'tab',
            type: 'menu',
            name: 'bankReceipt',
            visible: '0',
            cacheSupported: '1',
            perms: 'bankReceipt',
            icon: 'fa fa-file-o',
            remark: '',
            children: [],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '',
            createTime: '2023-08-02T09:43:14.000+00:00',
            updateTime: '2023-08-04T01:34:29.000+00:00',
          },
          {
            id: '1722423345997287424',
            title: '对账单',
            pid: '0',
            orderNum: '889',
            path: 'bank/checkBill',
            menuType: 'tab',
            type: 'menu',
            name: 'checkBill',
            visible: '0',
            cacheSupported: '1',
            perms: 'checkBill',
            icon: 'fa fa-th-list',
            remark: null,
            children: [],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '超级管理员',
            createTime: '2024-01-04T08:02:24.000+00:00',
            updateTime: '2024-01-04T08:02:24.000+00:00',
          },
          {
            id: '38',
            title: '查看链路',
            pid: '0',
            orderNum: '0',
            path: 'bank/traceView',
            menuType: 'tab',
            type: 'menu',
            name: 'traceView',
            visible: '1',
            cacheSupported: '1',
            perms: 'traceView',
            icon: 'fa fa-eye',
            remark: '',
            children: [],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '超级管理员',
            createTime: '2023-12-01T03:18:59.000+00:00',
            updateTime: '2023-12-01T03:18:59.000+00:00',
          },
          {
            id: '40',
            title: '银行接口信息',
            pid: '0',
            orderNum: '0',
            path: 'bank/bankInterInfo',
            menuType: 'tab',
            type: 'menu',
            name: 'bankInterInfo',
            visible: '1',
            cacheSupported: '1',
            perms: 'bankInterInfo',
            icon: 'fa fa-pinterest-p',
            remark: '',
            children: [],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '',
            createTime: '2023-08-11T06:37:52.000+00:00',
            updateTime: '2023-08-11T06:37:59.000+00:00',
          },
          {
            id: '41',
            title: '用户个人资料',
            pid: '0',
            orderNum: '0',
            path: 'sysConfig/userInfo',
            menuType: 'tab',
            type: 'menu',
            name: 'userInfo',
            visible: '1',
            cacheSupported: '1',
            perms: 'userInfo',
            icon: 'fa fa-user-md',
            remark: '',
            children: [],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '',
            createTime: '2023-08-11T06:46:57.000+00:00',
            updateTime: '2023-08-11T06:47:10.000+00:00',
          },
          {
            id: '42',
            title: '商户前置机支持接口',
            pid: '0',
            orderNum: '0',
            path: 'merchant/mcFrontOpenInterVersion',
            menuType: 'tab',
            type: 'menu',
            name: 'merchantFrontInterVersion',
            visible: '1',
            cacheSupported: '1',
            perms: 'merchantFrontInterVersion',
            icon: 'fa fa-tag',
            remark: '',
            children: [],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '',
            createTime: '2023-08-11T06:48:52.000+00:00',
            updateTime: '2023-08-11T06:49:03.000+00:00',
          },
          {
            id: '1714832681335918592',
            title: '支付明细',
            pid: '0',
            orderNum: '0',
            path: 'bank/orderDetail',
            menuType: 'tab',
            type: 'menu',
            name: 'orderDetail',
            visible: '1',
            cacheSupported: '1',
            perms: 'orderDetail',
            icon: 'fa fa-list',
            remark: null,
            children: [],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '超级管理员',
            createTime: '2023-10-19T03:31:16.000+00:00',
            updateTime: '2023-10-19T03:31:16.000+00:00',
          },
          {
            id: '23',
            title: '系统工具',
            pid: '0',
            orderNum: '0',
            path: '#',
            menuType: 'tab',
            type: 'menu_dir',
            name: null,
            visible: '0',
            cacheSupported: '1',
            perms: null,
            icon: 'fa fa-wrench',
            remark: '系统工具',
            children: [
              {
                createBy: '超级管理员',
                updateBy: '',
                createTime: '2023-08-02 09:43:55',
                updateTime: '2023-08-07 15:39:46',
                id: '25',
                title: '链路ID跟踪',
                pid: '23',
                orderNum: '1',
                path: 'bank/trace',
                menuType: 'tab',
                type: 'menu',
                name: 'trace',
                visible: '0',
                cacheSupported: '1',
                perms: 'trace',
                icon: 'fa fa-arrows-alt',
                remark: '',
                children: [],
                appKey: 'SYS_APP',
              },
              {
                createBy: '超级管理员',
                updateBy: '超级管理员',
                createTime: '2024-01-04 18:27:42',
                updateTime: '2024-01-04 18:27:42',
                id: '24',
                title: '接口测试',
                pid: '23',
                orderNum: '1',
                path: 'bank/testInter',
                menuType: 'tab',
                type: 'menu',
                name: 'testInter',
                visible: '0',
                cacheSupported: '1',
                perms: 'testInter',
                icon: 'fa fa-deafness',
                remark: '',
                children: [],
                appKey: 'SYS_APP',
              },
            ],
            appKey: 'SYS_APP',
            createBy: '超级管理员',
            updateBy: '',
            createTime: '2023-08-02T01:40:31.000+00:00',
            updateTime: '2023-08-04T01:26:44.000+00:00',
          },
        ],
      },
      {
        appKey: 'SYS_CONFIG',
        appName: '系统配置',
        tree: [
          {
            id: '28',
            title: '页面限流',
            pid: '0',
            orderNum: '0',
            path: 'bank/bankBankControlFlow',
            menuType: 'tab',
            type: 'menu',
            name: 'bankBankControlFlow',
            visible: '1',
            cacheSupported: '1',
            perms: 'bankBankControlFlow',
            icon: 'fa fa-deafness',
            remark: '',
            children: [],
            appKey: 'SYS_CONFIG',
            createBy: '超级管理员',
            updateBy: '超级管理员',
            createTime: '2024-01-04T10:11:43.000+00:00',
            updateTime: '2024-01-04T10:11:43.000+00:00',
          },
          {
            id: '39',
            title: '银行参数模板配置',
            pid: '0',
            orderNum: '0',
            path: 'bank/bankTemplateConfig',
            menuType: 'tab',
            type: 'menu',
            name: 'bankTemplateConfig',
            visible: '1',
            cacheSupported: '1',
            perms: 'bankTemplateConfig',
            icon: 'fa fa-bookmark-o',
            remark: '银行参数模板配置',
            children: [],
            appKey: 'SYS_CONFIG',
            createBy: '超级管理员',
            updateBy: '',
            createTime: '2023-08-11T06:22:32.000+00:00',
            updateTime: null,
          },
          {
            id: '43',
            title: '字典配置',
            pid: '0',
            orderNum: '0',
            path: 'bank/dict',
            menuType: 'tab',
            type: 'menu',
            name: 'dict',
            visible: '1',
            cacheSupported: '1',
            perms: 'bankDict',
            icon: 'fa fa-file-o',
            remark: '',
            children: [],
            appKey: 'SYS_CONFIG',
            createBy: '超级管理员',
            updateBy: '超级管理员',
            createTime: '2024-01-04T10:08:37.000+00:00',
            updateTime: '2024-01-04T10:08:37.000+00:00',
          },
        ],
      },
    ],
    avatar: null,
    superAdmin: false,
  },
  token: 'a33193ad-9f02-472d-a694-95eacc4df31b',
};
