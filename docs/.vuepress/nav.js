const navs = [
  {
    text: "首页",
    link: "/",
  },

  {
    text: "最新文章",
    link: "/latestarticle/",
  },

  {
    text: "前端",
    items: [
      { text: "CSS", link: "/fontend/css/" },
      { text: "JavaScript", link: "/fontend/js/" },
      { text: "前端框架", link: "/fontend/framework/" },
      { text: "前端算法", link: "/fontend/rsa/" },
      { text: "开发工具", link: "/fontend/tools/" },
      { text: "网址收藏", link: "/fontend/websitecol/" },
    ],
  },

  {
    text: "后端",
    items: [
      {
        text: "Node",
        link: "/backend/node/",
      },
    ],
  },

  {
    text: "小程序",
    items: [
      { text: "微信小程序", link: "/wechat/minprogram/" },
      { text: "云开发", link: "/wechat/cloudev/" },
    ],
  },

  {
    text: "面试题解",
    items: [
      { text: "CSS", link: "/interview/css/" },
      { text: "JavaScript", link: "/interview/js/" },
      { text: "微信小程序", link: "/interview/minprogram/" },
      { text: "React", link: "/interview/react/" },
      { text: "Vue", link: "/interview/vue/" },
      { text: "Http", link: "/interview/http/" },
      { text: "Node", link: "/interview/Node/" },
    ],
  },

  {
    text: "社交",
    items: [
      {
        text: "掘金",
        link: "https://juejin.im/user/5900e97b1b69e60058b936ed/posts",
      },
      { text: "简书", link: "https://www.jianshu.com/u/5ee7ee7fd180" },
      {
        text: "segmentfault",
        link: "https://segmentfault.com/u/suibichuanji_5900e1f5bcf67",
      },
      {
        text: "知乎",
        link: "https://www.zhihu.com/people/itclan",
      },
      {
        text: "视频教程",
        link: "https://space.bilibili.com/267957620",
      },
    ],
  },

  {
    text: "读书",
    items: [
      { text: "财富", link: "/read/wealth/" },
      { text: "文案", link: "/read/copywrite/" },
      { text: "运营", link: "/read/operate/" },
      { text: "领读", link: "/read/lingdu/" },
      { text: "复盘", link: "/read/replay/" },
    ],
  },
  { text: "关于我", link: "/about/" },
];

module.exports = navs;
