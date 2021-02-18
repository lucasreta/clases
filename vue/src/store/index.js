import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { bookmarks } from './bookmarks.module';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    alert,
    authentication,
    bookmarks,
  },
});

export default store;
