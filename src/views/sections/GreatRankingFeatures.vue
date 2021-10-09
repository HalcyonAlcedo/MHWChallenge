<template>
  <base-section
    id="greatranking-features"
  >
    <base-section-heading :title="$t('Ranking.Greattitle')" />

    <v-container>
      <v-row
        align="center"
        justify="center"
      >
        <v-col>
          <v-data-table
            :headers="headers"
            :items="rankingContent"
            :options.sync="options"
            :server-items-length="totalRankingContent"
            :loading="loading"
            :footer-props="{
              'items-per-page-options': [5,10,15],
            }"
          >
            <template #[`item.name`]="{ item }">
              <a :href="users[getUserInfo(item.steamid)].profileurl">
                <v-avatar size="32">
                  <img
                    :src="users[getUserInfo(item.steamid)].avatar"
                  >
                </v-avatar>
              </a>
              {{ item.name }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  function dateFormat (fmt, date) {
    let ret
    const opt = {
      'Y+': date.getFullYear().toString(),
      'm+': (date.getMonth() + 1).toString(),
      'd+': date.getDate().toString(),
      'H+': date.getHours().toString(),
      'M+': date.getMinutes().toString(),
      'S+': date.getSeconds().toString(),
    }
    for (const k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt)
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
      }
    }
    return fmt
  }

  export default {
    name: 'GreatRankingFeatures',

    data: () => ({
      totalRankingContent: 0,
      loading: true,
      options: {},
      rankingContent: [],
      users: [],
    }),

    computed: {
      headers: function () {
        return [
          { text: this.$i18n.t('Ranking.headers.player'), align: 'start', sortable: false, value: 'name' },
          { text: this.$i18n.t('Ranking.headers.record'), sortable: false, value: 'record' },
          { text: this.$i18n.t('Ranking.headers.death'), sortable: false, value: 'death' },
          { text: this.$i18n.t('Ranking.headers.weapon'), sortable: false, value: 'weapon' },
          { text: this.$i18n.t('Ranking.headers.clearance'), sortable: false, value: 'clearance' },
          { text: this.$i18n.t('Ranking.headers.time'), sortable: false, value: 'time' },
        ]
      },
    },

    watch: {
      options: {
        handler () {
          this.getDataFromApi()
        },
      },
    },

    mounted () {
      this.getDataFromApi()
    },

    methods: {
      getDataFromApi () {
        this.loading = true
        this.fakeApiCall().then(data => {
          this.rankingContent = data.items
          this.totalRankingContent = data.total
          this.loading = false
        })
      },
      fakeApiCall () {
        return new Promise((resolve, reject) => {
          const { page, itemsPerPage } = this.options
          this.axios
            .post('/api/GetGreatRanking', { page: page, itemsPerPage: itemsPerPage })
            .then(response => {
              const items = []
              const total = response.data.total
              for (const data of response.data.data) {
                items.push({
                  steamid: data.steamid,
                  name: data.caimogu !== '' ? `${data.player} (${this.$i18n.t('Ranking.RankingContent.caimogu')}：${data.caimogu})` : `${data.player}(${this.$i18n.t('Ranking.RankingContent.steam')}：${data.steamid})`,
                  record: parseInt(data.record / 60) + '分' + Math.round(data.record % 60) + '秒',
                  death: data.death,
                  weapon: this.getWeaponName(data.weapon),
                  clearance: data.clearance,
                  time: dateFormat('YYYY-mm-dd HH:MM', new Date(data.time)),
                })
                if (this.users.findIndex(a => { return a.steam3 === data.steamid }) === -1) {
                  this.users.push({ steam3: data.steamid, avatar: '', profileurl: '' })
                  this.axios
                    .post('/api/GetUserInfo', { steamId: data.steamid })
                    .then(userresponse => {
                      this.$set(this.users, this.users.findIndex(a => { return a.steam3 === data.steamid }), userresponse.data.steam)
                    })
                }
              }
              resolve({
                items,
                total,
              })
            })
        })
      },
      getUserInfo (steamid) {
        const user = this.users.findIndex(a => { return a.steam3 === steamid })
        return user
      },
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
