module.exports = {
  configureWebpack: {
    resolve: {
/*      extensions: [],后缀名配置*/
      alias: {
        // '@': 'src',源文件已有
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        // 'router': '@/router'一般情况下不需要
        // 'store': '@/store'一般情况下不需要
      }//一般情况之下$就解决了
    }
  }
}