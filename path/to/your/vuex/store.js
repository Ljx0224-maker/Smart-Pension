import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Your state properties here
    userInfo: null
  },
  mutations: {
    // Mutation to clear user information
    CLEAR_USER_INFO(state) {
      state.userInfo = null;
      // You can also clear other related state properties here
    }
  },
  actions: {
    // Define the logout action
    logout({ commit }) {
      // Call the CLEAR_USER_INFO mutation
      commit('CLEAR_USER_INFO');
      // You can also perform other logout - related operations here,
      // such as clearing local storage or session storage
      localStorage.removeItem('token');
    }
  },
  modules: {
    // Your modules here
  }
});
