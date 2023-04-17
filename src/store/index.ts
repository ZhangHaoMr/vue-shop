import { createStore } from 'vuex';
import { gitInfo, login } from '@/http/api';
import { setToken } from '@/composables/auth';

const store = createStore({
  state: {
    // 用户信息
    user: {},
    // 侧边宽度
    widthCe: '250px',
    menus: [],
    ruleNames: []
  },
  mutations: {
    // 记录用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
    // 侧边栏菜单宽度切换
    handleAsideWidth(state) {
      state.widthCe = state.widthCe == '250px' ? '64px' : '250px';
    },
    // 记录后台返回的菜单数据
    SET_MENUS(state, menus) {
      state.menus = menus;
    },
    // 记录后台返回的按钮权限数据
    SET_RULENAMES(state, ruleNames) {
      state.ruleNames = ruleNames;
    }
  },
  actions: {
    // 登录方法
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        login(payload)
          .then((response: any) => {
            setToken(response.token);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 获取当前用户登录信息
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        gitInfo().then((response: any) => {
          commit('SET_USERINFO', response);
          commit('SET_MENUS', response.menus);
          commit('SET_RULENAMES', response.ruleNames);
          resolve(response);
        });
      });
    }
  }
});
// function reject(error: any) {
//   throw new Error(error);
// }

export default store;
