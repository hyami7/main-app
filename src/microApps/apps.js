import store from './store';

const microApps = [
  {
    name: 'base-app',
    entry: import.meta.env.VITE_SKLF_BASEAPP,
    activeRule: '/base-app',
    container: '#app-base',
  },
];

const apps = microApps.map((item) => {
  return {
    ...item,
    // container: "#subapp-container",
    // props: {
    //   routerBase: item.activeRule,
    //   getGlobalState: store.getGlobalState,
    // },
  };
});

export default apps;
