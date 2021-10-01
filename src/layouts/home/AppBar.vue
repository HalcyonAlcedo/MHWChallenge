<template>
  <div>
    <v-app-bar
      id="home-app-bar"
      app
      elevation="1"
      elevate-on-scroll
      height="80"
    >
      <v-col
        cols="4"
        sm="3"
        lg="2"
      >
        <v-select
          v-model="lang"
          :items="langlist"
          menu-props="auto"
          label="Select"
          prepend-icon="mdi-translate"
          hide-details
          single-line
        />
      </v-col>

      <v-spacer />

      <div>
        <v-tabs
          optional
          background-color="transparent"
        >
          <v-tab
            v-for="(name, i) in items"
            :key="i"
            :to="{ name }"
            :exact="name === 'Home'"
            :ripple="false"
            class="font-weight-bold"
            min-width="96"
            text
          >
            {{ name }}
          </v-tab>
        </v-tabs>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'HomeAppBar',

    data: () => ({
      items: [
        '主页',
        '天梯榜',
      ],
      lang: '中文',
      langlist: [
        '中文',
        'English',
      ],
    }),

    watch: {
      lang (val) {
        switch (val) {
          case '中文':
            this.$i18n.locale = 'zh_cn'
            break
          case 'English':
            this.$i18n.locale = 'en'
            break
          default:
            this.$i18n.locale = 'zh_cn'
            break
        }
      },
    },
  }
</script>

<style lang="sass">
  #home-app-bar
    .v-tabs-slider
      max-width: 24px
      margin: 0 auto

    .v-tab
      &::before
        display: none
</style>
