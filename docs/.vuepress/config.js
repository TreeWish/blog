const nav = require("./nav");
const head = require("./head");
const plugins = require("./plugin");

module.exports = {
  title: "TreeWish",
  description: "专注前端技术栈分享",
  head,
  themeConfig: {
    nav,
    sidebar: "auto",
  },
  plugins,
  markdown: {
    lineNumbers: true,
    extractHeaders: ["h1", "h2", "h3", "h4", "h5", "h6"],
  },
};
