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

Vue.use(VueNativeSock, 'ws://39.106.150.173:8126/Api', {
  store: store,
  mutations: mutations,
  format: 'json',
})