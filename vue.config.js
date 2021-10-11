module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: { // 配置跨域
      '/apiv2': {
        target: 'http://challenge.alcedo.top/apiv2',
        changOrigin: true,
        pathRewrite: {
          '^/apiv2': '',
        },
      },
    },
  },

  transpileDependencies: [
    'vuetify',
  ],

  pluginOptions: {
    i18n: {
      locale: 'zh_cn',
      fallbackLocale: 'en',
      localeDir: 'lang',
      enableInSFC: false,
    },
  },
}
