import { createStore } from 'vuex';
import persistedstate from 'vuex-persistedstate';

const store = createStore({
  state: {
    user: {}
  },
  mutations: {
    setUserinfo(state, user) {
      state.user = user;
    }
  },
  plugins: [persistedstate()]
});

export default store;
