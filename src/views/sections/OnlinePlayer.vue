<template>
  <base-section id="online-player">
    <base-section-heading :title="$t('OnlyPlayer.title')" />

    <v-container>
      <v-row
        align="center"
        justify="center"
      >
        <v-col>
          <v-data-table
            :headers="headers"
            :items="players"
          />
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'OnlinePlaye',

    data: () => ({
      players: [],
    }),

    computed: {
      headers: function () {
        return [
          { text: this.$i18n.t('OnlyPlayer.headers.player'), align: 'start', sortable: false, value: 'Name' },
          { text: this.$i18n.t('OnlyPlayer.headers.clearance'), sortable: false, value: 'Clearance' },
          { text: this.$i18n.t('OnlyPlayer.headers.weapon'), sortable: false, value: 'Weapon' },
          { text: this.$i18n.t('OnlyPlayer.headers.assembly'), sortable: false, value: 'Assembly' },
        ]
      },
    },

    watch: {
      '$store.state.websocknet.socket.message': {
        handler (newVal, oldVal) {
          if (newVal.Command) {
            switch (newVal.Command) {
              case 'Login':
                if (this.players.findIndex(i => { return i.SteamId === newVal.User.SteamId }) === -1) {
                  this.players.push(newVal.Data)
                }
                break
              case 'logout': {
                const playerIndex = this.players.findIndex(i => { return i.SteamId === newVal.User })
                if (playerIndex !== -1) {
                  this.players.splice(playerIndex, 1)
                } else {
                  console.log(this.players)
                }
                break
              }
              case 'UpdatePlayer': {
                const playerIndex = this.players.findIndex(i => { return i.SteamId === newVal.User.SteamId })
                this.$set(this.players, playerIndex, {
                  SteamId: newVal.User.SteamId,
                  Name: newVal.Data.Name,
                  Assembly: newVal.Data.Assembly,
                  Weapon: newVal.Data.Weapon,
                  Clearance: newVal.Data.Clearance,
                })
                break
              }
              case 'RetUserList':
                this.players = newVal.Data
                break
              default:
                break
            }
          }
        },
      },
    },

    mounted () {
      this.$socket.send(JSON.stringify({
        Command: 'GetUserList',
      }))
    },

    methods: {
      getWeaponName (weapon) {
        switch (weapon) {
          case 0:
            return this.$i18n.t('General.Weapon.wp_0')
          case 1:
            return this.$i18n.t('General.Weapon.wp_1')
          case 2:
            return this.$i18n.t('General.Weapon.wp_2')
          case 3:
            return this.$i18n.t('General.Weapon.wp_3')
          case 4:
            return this.$i18n.t('General.Weapon.wp_4')
          case 5:
            return this.$i18n.t('General.Weapon.wp_5')
          case 6:
            return this.$i18n.t('General.Weapon.wp_6')
          case 7:
            return this.$i18n.t('General.Weapon.wp_7')
          case 8:
            return this.$i18n.t('General.Weapon.wp_8')
          case 9:
            return this.$i18n.t('General.Weapon.wp_9')
          case 10:
            return this.$i18n.t('General.Weapon.wp_10')
          case 11:
            return this.$i18n.t('General.Weapon.wp_11')
          case 12:
            return this.$i18n.t('General.Weapon.wp_12')
          case 13:
            return this.$i18n.t('General.Weapon.wp_13')
          default:
            return this.$i18n.t('General.Weapon.wp_err')
        }
      },
    },
  }
</script>
