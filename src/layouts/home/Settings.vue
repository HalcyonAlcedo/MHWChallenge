<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    bottom
    left
    max-width="90%"
    min-width="400"
    offset-x
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template #activator="{ attrs, on }">
      <v-card
        id="settings"
        class="py-2 px-4"
        color="#0000004D"
        dark
        flat
        style="position: fixed; top: 164px; right: -35px;"
        width="100"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon large>
          mdi-account-circle-outline
        </v-icon>
      </v-card>
    </template>

    <v-card class="py-2">
      <base-title
        :title="$t('User.title')"
        align="center"
        space="0"
      />

      <v-card-text v-if="$store.state.steamId != 0">
        <div class="text-center">
          <v-avatar
            class="center"
            size="80"
          >
            <img
              :src="user.avatar"
            >
          </v-avatar>
          <v-spacer />
          {{ user.name }}
        </div>

        <v-divider class="my-6" />

        <v-item-group class="d-flex justify-center">
          <v-item class="mlt-2 mx-lg-auto">
            <v-progress-circular
              :rotate="270"
              :size="90"
              :width="3"
              :value="user.storey"
              color="teal"
            >
              {{ `${ $t('User.storey') }:${ user.storey != null ? user.storey : 0 }` }}
            </v-progress-circular>
          </v-item>
          <v-item class="mlt-2 mx-lg-auto">
            <v-progress-circular
              :rotate="270"
              :size="90"
              :width="3"
              :value="user.challengeCount"
              color="indigo darken-2"
            >
              {{ `${ $t('User.challengeCount') }:${ user.challengeCount != null ? user.challengeCount : 0 }` }}
            </v-progress-circular>
          </v-item>
          <v-item class="mlt-2 mx-lg-auto">
            <v-progress-circular
              :rotate="270"
              :size="90"
              :width="3"
              :value="user.death"
              color="deep-orange lighten-2"
            >
              {{ `${ $t('User.death') }:${ user.death != null ? user.death : 0 }` }}
            </v-progress-circular>
          </v-item>
        </v-item-group>

        <v-divider class="my-6" />

        <v-banner single-line>
          <v-icon
            slot="icon"
            color="deep-purple darken-3"
            size="24"
          >
            mdi-star-four-points-outline
          </v-icon>
          {{ $t('User.points') }} ： {{ user.points }}
        </v-banner>
        <v-banner single-line>
          <v-icon
            slot="icon"
            color="light-blue darken-3"
            size="24"
          >
            mdi-layers-outline
          </v-icon>
          {{ $t('User.layer',{ layer: user.layer }) }}
        </v-banner>

        <v-divider
          v-if="user.vac"
          class="my-6"
        />

        <v-alert
          v-if="user.vac"
          prominent
          type="error"
        >
          <v-row align="center">
            <v-col class="grow">
              {{ $t('User.vacban') }}
            </v-col>
          </v-row>
        </v-alert>

        <v-divider class="my-6" />

        <base-btn
          :outlined="!$vuetify.theme.dark"
          @click="$store.commit('setSteamId', {
            id: 0,
            name: '网页用户',
          })"
        >
          <v-icon left>
            mdi-logout
          </v-icon>
          {{ $t('User.logout') }}
        </base-btn>
      </v-card-text>
      <v-card-text v-else>
        <div class="text-center">
          <a href="https://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=http://www.alcedogroup.com&openid.return_to=http://www.alcedogroup.com">
            <base-btn
              :outlined="!$vuetify.theme.dark"
            >
              <v-icon left>
                mdi-login
              </v-icon>
              {{ $t('User.login') }}
            </base-btn>
          </a>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
  export default {
    name: 'HomeSettings',

    data () {
      return {
        menu: false,
        user: {
          name: '',
          storey: 0,
          challengeCount: 0,
          death: 0,
          avatar: '',
        },
      }
    },

    mounted () {
      const obj = {}
      const query = window.location.search.substring(1)
      const vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=')
        obj[pair[0]] = pair[1]
      }
      if (obj['openid.claimed_id']) {
        const steamid = obj['openid.claimed_id'].slice(obj['openid.claimed_id'].lastIndexOf('Fid%2F') + 6)
        this.axios
          .post('/api/GetUserInfo', { steamId: steamid.toString() })
          .then(response => {
            this.$store.commit('setSteamId', {
              id: steamid,
              name: response.data.steam.username,
            })
            this.user = {
              name: response.data.steam.username,
              storey: response.data.data.storey,
              challengeCount: response.data.data.challengeCount,
              death: response.data.data.death,
              avatar: response.data.steam.avatar,
              vac: response.data.user.vac === 1,
              points: response.data.user.points,
              layer: response.data.user.layer,
            }
          })
        this.$router.push({ query: {} })
      } else if (this.$store.state.steamId !== 0) {
        this.axios
          .post('/api/GetUserInfo', { steamId: this.$store.state.steamId.toString() })
          .then(response => {
            this.user = {
              name: response.data.steam.username,
              storey: response.data.data.storey,
              challengeCount: response.data.data.challengeCount,
              death: response.data.data.death,
              avatar: response.data.steam.avatar,
              vac: response.data.user.vac === 1,
              points: response.data.user.points,
              layer: response.data.user.layer,
            }
          })
      }
    },
  }
</script>
