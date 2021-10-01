import Vue from 'vue'
import Vuex from 'vuex'
import websocknet from './modules/websocket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    steamId: 0,
    userName: '网页用户',
  },
  mutations: {
    setSteamId (state, user) {
      state.steamId = user.id
      state.userName = user.name
    },
  },
  actions: {
  },
  modules: {
    websocknet: websocknet,
  },
})
