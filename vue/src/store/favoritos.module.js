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
          commit('success', user.bookmarks);
        })
        .catch((error) => {
          console.error(error);
          commit('clear');
          dispatch('alert/error', 'La sesión expiró', { root: true });
        });
    },
    crear({ dispatch, commit }, link) {
      userService.add(link)
        .then((user) => {
          commit('success', user.bookmarks);
        })
        .catch((error) => {
          console.error(error);
          dispatch('alert/error', 'Error al agregar el link', { root: true });
        });
    },
    borrar({ dispatch, commit }, linkId) {
      userService.remove(linkId)
        .then((user) => {
          commit('success', user.bookmarks);
        })
        .catch((error) => {
          console.error(error);
          dispatch('alert/error', 'Error al eliminar el link', { root: true });
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
