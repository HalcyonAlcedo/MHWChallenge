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

Vue.use(VueNativeSock, 'wss://api.alcedo.top:8128/Api', {
  store: store,
  mutations: mutations,
  format: 'json',
})
