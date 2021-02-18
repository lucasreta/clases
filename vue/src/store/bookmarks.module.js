import i18n from '@/i18n.js';

import { userService } from '@/services';
import router from '@/router';

export const bookmarks = {
  namespaced: true,
  state: {
    list: [],
  },
  actions: {
    getByUser({ dispatch, commit }, id) {
      userService.get(id)
        .then((user) => {
          commit('success', user.bookmarks);
        })
        .catch((error) => {
          console.error(error);
          if (error.status === 401) {
            dispatch('alert/error', i18n.t('alerts.logout'), { root: true });
            dispatch('authentication/logout', '', { root: true });
            router.push('/login');
          } else {
            commit('clear');
          }
        });
    },
    create({ dispatch, commit }, link) {
      userService.add(link)
        .then((user) => {
          commit('success', user.bookmarks);
        })
        .catch((error) => {
          console.error(error);
          if (error.status === 401) {
            dispatch('alert/error', i18n.t('alerts.logout'), { root: true });
            dispatch('authentication/logout', '', { root: true });
            router.push('/login');
          } else {
            dispatch('alert/error', i18n.t('alerts.add-link-failure'), { root: true });
          }
        });
    },
    delete({ dispatch, commit }, linkId) {
      userService.remove(linkId)
        .then((user) => {
          commit('success', user.bookmarks);
        })
        .catch((error) => {
          console.error(error);
          if (error.status === 401) {
            dispatch('alert/error', i18n.t('alerts.logout'), { root: true });
            dispatch('authentication/logout', '', { root: true });
            router.push('/login');
          } else {
            dispatch('alert/error', i18n.t('alerts.remove-link-failure'), { root: true });
          }
        });
    },
  },
  mutations: {
    success(state, list) {
      state.list = list;
    },
    clear(state) {
      state.list = [];
    }
  },
};
