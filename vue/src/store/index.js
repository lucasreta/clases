import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { autenticacion } from './autenticacion.module';
import { favoritos } from './favoritos.module';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    alert,
    autenticacion,
    favoritos,
  },
});

export default store;
