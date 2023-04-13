import { createStore } from 'vuex';
import persistedstate from 'vuex-persistedstate';

const store = createStore({
  state: {
    // 用户信息
    user: {},
    // 侧边宽度
    widthCe: '250px',
    menus: []
  },
  mutations: {
    setUserinfo(state, user) {
      state.user = user;
      state.menus = user.menus;
    },
    handWidth(state) {
      state.widthCe = state.widthCe == '250px' ? '65px' : '250px';
    }
  },
  plugins: [persistedstate()]
});

export default store;
