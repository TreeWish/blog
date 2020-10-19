const plugins = [
  ["@vuepress/back-to-top"],
  [
    "@vuepress/pwa",
    {
      serviceWorker: true,
      updatePopup: true,
    },
  ],
  [
    "@vuepress/medium-zoom",
    {
      selector: ".medium-zoom", // 指定含有medium-zoom的类缩放,后面这个类名可自定义,markdown中的img的class类保持一致就可以了的,没有指明的图片类将不支持缩放
      delay: 1000, // 延迟1秒
      options: {
        margin: 24,
        scrollOffset: 0,
      },
    },
  ],
  [
    "vuepress-plugin-auto-sidebar",
    {
      titleMode: "titlecase", // 标题模式
      collapsable: true, // 设置为true,开启折叠
      // sidebarDepth: 0,    // 标题的深度
      collapseList: [
        // 折叠的路由列表
        // "/frontend/css/"
      ],
      uncollapseList: [
        // 不折叠的路由列表
      ],
    },
  ],
  [
    "vuepress-plugin-comment",
    {
      choosen: "valine",
      // options选项中的所有参数，会传给Valine的配置
      options: {
        el: "#valine-vuepress-comment",
        appId: "Bm90us2UasL9KVcHmVIwbjuV-gzGzoHsz",
        appKey: "wmGtn83At6EYsCf5ANxvcd5Q",
      },
    },
  ],
];
module.exports = plugins;
