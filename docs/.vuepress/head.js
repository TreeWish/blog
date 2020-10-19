const head = [
  [
    "meta", // 移动端禁止用户缩放
    {
      name: "viewport",
      content:
        "width=device-width,width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
    },
  ],
  ["link", { rel: "stylesheet", href: "/css/style.css" }], //
  ["script", { charset: "utf-8", src: "/js/disable-user-zoom.js" }], // 移动端,禁止用户缩放,引入你写的js
];
module.exports = head