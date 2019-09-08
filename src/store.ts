import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inputData: {}
  },
  mutations: {
    updateInputData(state, newInputData) {
      state.inputData = newInputData;
    }
  },
  actions: {}
});
