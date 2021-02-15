import i18n from '@/i18n.js';

import { userService } from '@/services';
import router from '@/router';

const initialUser = JSON.parse(localStorage.getItem('user'));
const initialState = initialUser
  ? { status: { loggedIn: true }, user: initialUser }
  : { status: {}, user: null };

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ dispatch, commit }, { username, password }) {
      commit('loginRequest', { username });
      userService.login({ username, password })
        .then((user) => {
          commit('loginSuccess', user);
          dispatch('alert/clear', '', { root: true });
          router.push('/bookmarks');
        })
        .catch((error) => {
          commit('loginFailure', error);
          dispatch('alert/error', i18n.t('alerts.login-error'), { root: true });
        });
    },
    signup({ dispatch, commit }, { username, password}) {
      userService.signup({ username, password })
        .then((user) => {
          commit('loginSuccess', user);
          dispatch('alert/success', i18n.tc('alerts.signup-success', user.username), { root: true });
          router.push('/bookmarks');
        })
        .catch((error) => {
          commit('loginFailure', error);
          dispatch('alert/error', error, { root: true });
        });
    },
    logout({ commit }) {
      userService.logout();
      commit('logout');
    },
  },
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    },
    logout(state) {
      state.status = {};
      state.user = null;
    },
  },
};
