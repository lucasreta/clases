import { userService } from '../services';

export const favoritos = {
  namespaced: true,
  state: {
    lista: [],
  },
  actions: {
    porUsuario({ dispatch, commit }, id) {
      userService.get(id)
        .then((user) => {
          console.log(user);
          commit('success', user.bookmarks);
        })
        .catch((error) => {
          console.error(error);
          commit('clear');
          dispatch('alert/error', 'La sesión expiró', { root: true });
        });
    },
  },
  mutations: {
    success(state, lista) {
      state.lista = lista;
    },
    clear(state) {
      state.lista = [];
    }
  },
};
