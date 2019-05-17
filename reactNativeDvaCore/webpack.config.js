/**
 * 不是真实的 webpack 配置，仅为兼容 webstorm 和 intellij idea 代码跳转
 * ref: https://github.com/umijs/umi/issues/1109#issuecomment-423380125
 */

module.exports = {
  resolve: {
    alias: {
      "components": require('path').resolve(__dirname, "app/components"),
      "config": require('path').resolve(__dirname, "app/config"),
      "modules": require('path').resolve(__dirname, "app/modules"),
      "test": require('path').resolve(__dirname, "app/modules/test"),
      "resource": require('path').resolve(__dirname, "app/resource"),
      "tools": require('path').resolve(__dirname, "app/tools")
    },
  },
};
