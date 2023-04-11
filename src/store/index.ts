import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: {}
  },
  mutations: {
    setUserinfo(state, user) {
      state.user = user;
    }
  }
});

export default store;
