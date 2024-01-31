/* @vite-ignore */
import { isNavigationFailure, NavigationFailureType } from 'vue-router';
import { ElNotification } from 'element-plus';
import { useTabsStore } from '@/store/modules/tabs';
import { baseRoute } from '@/router/static';
import { compact, reverse } from 'lodash-es';

const viewsComponent = import.meta.globEager('/src/views/**/*.vue');

/**
 * 导航失败有错误消息的路由push
 * @param to — 导航位置，同 router.push
 */
export const routePush = async (to, router) => {
  try {
    const failure = await router.push(to);
    if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
      ElNotification({
        message: 'utils.Navigation failed, navigation guard intercepted!',
        type: 'error',
      });
    }
  } catch (error) {
    if (error && error.toString().concat('401')) {
      return;
    }
    ElNotification({
      message: 'utils.Navigation failed, invalid route!',
      type: 'error',
    });
    console.error(error);
  }
};

/**
 * 获取第一个菜单
 */
export const getFirstRoute = (routes, router) => {
  const routerPaths = [];
  const routers = router.getRoutes();
  routers.forEach((item) => {
    if (item.path) routerPaths.push(item.path);
  });
  let find = false;
  for (const key in routes) {
    if (routes[key].meta?.type != 'menu_dir' && routerPaths.indexOf(routes[key].path) !== -1) {
      return routes[key];
    } else if (routes[key].children && routes[key].children?.length) {
      find = getFirstRoute(routes[key].children, router);
      if (find) return find;
    }
  }
  return find;
};

/**
 * 打开侧边菜单
 * @param menu 菜单数据
 */
export const onClickMenu = (menu, router) => {
  switch (menu.meta?.menuType) {
    case 'tab':
      routePush({ path: menu.path }, router);
      break;
    case 'link':
      window.open(menu.path, '_blank');
      break;
    default:
      ElNotification({
        message: 'utils.Navigation failed, the menu type is unrecognized!',
        type: 'error',
      });
      break;
  }
};

/**
 * 处理后台的路由
 */
export const handleAdminRoute = (routes, router) => {
  addRouteAll(viewsComponent, routes, baseRoute.name, false, router);
  const menuAdminBaseRoute = baseRoute.name ? '/' + baseRoute.name + '/' : '/';
  const menuRule = handleMenuRule(routes, menuAdminBaseRoute, 'admin');
  // // 更新stores中的路由菜单数据
  const tabsStore = useTabsStore();
  tabsStore.setRouteViews(menuRule);
};

/**
 * 获取菜单的paths
 */
export const getMenuPaths = (menus) => {
  let menuPaths = [];
  menus.forEach((item) => {
    menuPaths.push(item.path);
    if (item.children && item.children.length > 0) {
      menuPaths = menuPaths.concat(getMenuPaths(item.children));
    }
  });
  return menuPaths;
};

/**
 * 菜单处理
 */
const handleMenuRule = (routes, pathPrefix = '/', module = 'admin') => {
  const menuRule = [];
  for (const key in routes) {
    // 隐藏菜单
    if (routes[key].visible !== '0') {
      continue;
    }
    if (routes[key].extend == 'add_rules_only') {
      continue;
    }
    if (routes[key].type == 'menu' || routes[key].type == 'menu_dir') {
      if (routes[key].type == 'menu_dir' && routes[key].children && !routes[key].children.length) {
        continue;
      }
      const currentPath = routes[key].menuType == 'link' ? routes[key].path : pathPrefix + routes[key].path;
      let children = [];
      if (routes[key].children && routes[key].children.length > 0) {
        children = handleMenuRule(routes[key].children, pathPrefix, module);
      }
      menuRule.push({
        id: routes[key].id,
        path: currentPath,
        name: routes[key].name,
        component: '/src/views/' + routes[key].path + '.vue',
        meta: {
          title: routes[key].title,
          icon: 'fa ' + routes[key].icon,
          keepalive: routes[key].keepalive,
          type: routes[key].type,
          menuType: routes[key].menuType,
          keepalive: routes[key].cacheSupported == 1 ? routes[key].name : '',
        },
        children: children,
      });
    }
  }
  return menuRule;
};

/**
 * 动态添加路由-带子路由
 * @param viewsComponent
 * @param routes
 * @param parentName
 * @param analyticRelation 根据 name 从已注册路由分析父级路由
 */
export const addRouteAll = (viewsComponent, routes, parentName, analyticRelation = false, router) => {
  for (const idx in routes) {
    if (routes[idx].extend == 'add_menu_only') {
      continue;
    }
    if (routes[idx].menuType == 'tab' && viewsComponent['/src/views/' + routes[idx].path + '.vue']) {
      addRouteItem(viewsComponent, routes[idx], parentName, analyticRelation, router);
    }

    if (routes[idx].children && routes[idx].children.length > 0) {
      addRouteAll(viewsComponent, routes[idx].children, parentName, analyticRelation, router);
    }
  }
};

/**
 * 动态添加路由
 * @param viewsComponent
 * @param route
 * @param parentName
 * @param analyticRelation 根据 name 从已注册路由分析父级路由
 */
export const addRouteItem = (viewsComponent, route, parentName, analyticRelation, router) => {
  let path = '',
    component;
  path = parentName ? route.path : '/' + route.path;
  component = viewsComponent['/src/views/' + route.path + '.vue'].default;
  component.name = route.name;
  if (route.menuType === 'tab' && analyticRelation) {
    const parentNames = getParentNames(route.name);
    if (parentNames.length) {
      for (const key in parentNames) {
        if (router.hasRoute(parentNames[key])) {
          parentName = parentNames[key];
          break;
        }
      }
    }
  }
  const routeBaseInfo = {
    path: path,
    name: route.name,
    component: component,
    meta: {
      title: route.title,
      extend: route.extend,
      icon: 'fa ' + route.icon,
      keepalive: route.cacheSupported == 1 ? route.name : '',
      menuType: route.menuType,
      type: route.type,
      addtab: true,
    },
  };

  if (parentName) {
    router.addRoute(parentName, routeBaseInfo);
  } else {
    router.addRoute('home', routeBaseInfo);
  }
};

/**
 * 根据name字符串，获取父级name组合的数组
 * @param name
 */
const getParentNames = (name) => {
  const names = compact(name.split('/'));
  const tempNames = [];
  const parentNames = [];
  for (const key in names) {
    tempNames.push(names[key]);
    if (parseInt(key) != names.length - 1) {
      parentNames.push(tempNames.join('/'));
    }
  }
  return reverse(parentNames);
};
