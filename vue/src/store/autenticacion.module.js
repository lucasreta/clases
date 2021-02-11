import { userService } from '../services';
import router from '../router';

const initialUser = JSON.parse(localStorage.getItem('user'));
const initialState = initialUser
  ? { status: { loggedIn: true }, user: initialUser }
  : { status: {}, user: null };

export const autenticacion = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ dispatch, commit }, { username, password }) {
      commit('loginRequest', { username });
      userService.login({ username, password })
        .then((user) => {
          console.log(user);
          commit('loginSuccess', user);
          dispatch('alert/clear');
          router.push('/favoritos');
        })
        .catch((error) => {
          commit('loginFailure', error);
          dispatch('alert/error', 'Usuario o Contraseña incorrecta', { root: true });
        });
    },
    signup({ dispatch, commit }, { username, password}) {
      userService.signup({ username, password })
        .then((user) => {
          commit('loginSuccess', user);
          dispatch('alert/success', `¡Bienvenido, ${user.username}!`, { root: true });
          router.push('/favoritos');
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
