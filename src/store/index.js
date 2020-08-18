import Vue from 'vue';
import Vuex from 'vuex';
import { getUser, setUser, removeUser } from '@/utils/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 导航的收放状态 false为展开  true为收起来
    collapsed: false,
    user: getUser(),
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUser(state, userInfo) {
      state.user = userInfo;
    },
    logout(state) {
      state.user = {
        username: '',
        appkey: '',
        email: '',
        role: '',
      };
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUser({ commit }, userInfo) {
      commit('setUser', userInfo);
      setUser(userInfo);
    },
    logout({ commit }) {
      commit('logout');
      removeUser();
    },
  },
  modules: {
  },
});
