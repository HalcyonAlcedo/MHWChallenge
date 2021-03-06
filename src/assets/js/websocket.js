import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import store from '@/store'

import {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR,
} from '@/store/mutation-types'

const mutations = {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR,
}

Vue.use(VueNativeSock, 'wss://ws.alcedo.top:3000/Api', {
  store: store,
  mutations: mutations,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
  format: 'json',
})
