module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: { // 配置跨域
      '/api': {
        target: 'http://challenge.alcedo.top/apiv2/web',
        changOrigin: true,
        pathRewrite: {
          '^/api': '',
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
