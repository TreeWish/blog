---
comment: false 
# comments: false 
---

# HTML

## 1.doctype的意义是什么

* 让浏览器以标准模式渲染
* 让浏览器知道元素的合法性

## 2.HTML XHTML HTML5的关系

* HTML属于SGML
* XHTML属于XML，HTML进行严格化结果
* HTML5不属于SGML或XML,比XHTML宽松，自己本身就是一种标准

## 3.HTML5有什么变化

* 新的语义化
* 表单增强
* 新的API（离线、音视频、图形、实时通信、本地存储、设备能力）
* 分类和嵌套规则变更

## 4.em和i有什么区别

* em是语义化标签，表强调
* i是纯样式标签，表斜体

## 5.语义化的意思是什么

* 开发者更易理解
* 机器容易理解结果（搜索、读屏软件）
* 有助于SEO
* semantic microdata 把页面的元素进一步的标记

## 6.哪些元素可以自闭合

* input、img、ba、hr、meta、link

## 7.HTML和DOM的关系

* HTML是“死”的
* DOM由HTML解析而来，是”活“的
* JS可以维护DOM

## 8.property和attaribuate的区别

* property特性       表现形式       				// 修改对象属性，不会体现到HTML结构中
* attaribuate属性    元素身上固有的属性  // 修改元素属性，会改变到HTML中     
* 都可能引起DOM重新渲染，尽量采用property

## 9.form的作用有哪些

* 直接提交表单
* 使用submit/reset按钮
* 便于浏览器保存数据
* 第三方库可以整体提取值
* 第三方库可以进行表单验证

# CSS

## 1.CSS选择器优先级

* ！important
* 内联样式
  *后写优先级高

## 2.雪碧图的作用

* 减少http的请求次数 提高加载性能
* 有一些情况可以减少图片大小

## 3.自定义字体的使用场景

* banner/logo宣传文案
* 字体图标

## 4.base64的使用

* 减少http请求
* 适用于小图片
* 会增大体积，大概是原图的3/4

## 5.伪类和伪元素的区别

* 伪类表状态 单冒号
* 伪元素是真的元素 双冒号，但有的有浏览器支持单冒号（历史遗留问题）

## 6.如何美化checkbox？

* label[for] + checkbox---id
* 隐藏原生input display:none
* :checked + label 使用伪类选择器 

## 7.float和inline-block

```
对兄弟的影响:
上面贴非float元素
旁边贴float元素
不影响其它块级元素位置
影响其它块级元素内部文本

对父级元素的影响
从布局上“消失”
高度塌陷
```



```
inline-block
像文本一样排block元素
没有清除浮动等问题
需要处理间隙

```



## 8.实现两栏或三栏布局的方法

* 表格布局  
* float + margin 布局  需要清除浮动
* inline-block 布局  需要清除文字间隙
* flexbox布局  兼容性不是特别好

## 9.postion:absolute / fixed 有什么区别?

* absolute相对于最近的absolute / relative
* fixed 相对于屏幕 PC相对于body  移动端相对于 viewport

## 10.如何清除浮动

```js
// 1. 给父级添加overflow
overflow: hidden(auto)
// 2.伪元素
.clearfix::after {
	content: '',
    display: table,
    clear: both  //clear清除的是相邻元素,其实更应该说是“让左/右边不允许出现其他浮动元素”。
}
.clearfix {
    *zoom: 1 // 兼容IE
}
// 3. 在浮动元素下加<div class="clear"></div>
.clear{ height:0px;font-size:0;clear:both;}
```



## 12.如何适配移动端页面

```js
// 1.设置viewport进行缩放

简单粗暴，使用过程中反应缩放会导致有些页面元素会糊的情况。天猫的web app的首页使用这种方案
在页面中加入viewport.js

<meta name="viewport" content="width=固定宽度">
var doc = window.document,
    docEle = doc.documentElement,
    dpr = Math.ceil(window.devicePixelRatio),
    vp = document.querySelector('meta[name="viewport"]'),
    docWidth = docEle.clientWidth,
    r = docWidth / 375;
vp.setAttribute('content', 'width=375,initial-scale=' + r + ',maximum-scale=' + r * dpr + ', minimum-scale=' + r / dpr + ',user-scalable=no');

// 2.rem + media query + viewport

rem是通过根元素进行适配的，网页中的根元素指的是html。我们通过设置html的字体大小就可以控制rem的大小。
在页面中加入common.js

<meta name="viewport" content="width=device-width">
var dpr, rem, scale;

var fontEl = document.createElement('style');
var metaEl = document.querySelector('meta[name="viewport"]');
var docEl = document.documentElement;
dpr = window.devicePixelRatio || 1;
rem =  docEl.clientWidth  / 10;
scale = 1 / dpr;

// 设置viewport，进行缩放，达到高清效果
//metaEl.setAttribute('content', 'width=' + dpr * rem + ',initial-scale=1,maximum-scale=1, minimum-scale=1,user-scalable=no');

// 设置data-dpr属性，留作的css hack之用
docEl.setAttribute('data-dpr', dpr);

// 动态写入样式
docEl.firstElementChild.appendChild(fontEl);
fontEl.innerHTML = 'html{font-size:' + rem + 'px;}';

// 给js调用的，某一dpr下rem和px之间的转换函数
window.rem2px = function(v) {
    v = parseFloat(v);
    return v * rem;
};
window.px2rem = function(v) {
    v = parseFloat(v);
    return v / rem;
};

window.dpr = dpr;
window.rem = rem;

// 3. rem + flexible.js
即使用js动态设置根字体
//获取手机屏幕宽度
var deviceWidth = document.documentElement.clientWidth;

//将方案二中的media中的设置，在这里动态设置
//这里设置的就是html的font-size
document.documentElement.style.fontSize = deviceWidth + 'px';
```

## 13.clip-path裁剪   可以和SVG配合（实现IOS图标的圆角）

● 对容器进行裁剪
● 常见几何图形
● 自定义路径

![1595240267788](C:\Users\11310\AppData\Roaming\Typora\typora-user-images\1595240267788.png)



![1595241721480](C:\Users\11310\AppData\Roaming\Typora\typora-user-images\1595241721480.png)

## 14.如何实现3D效果

* perspective: 500px

* transform-style: preserve-3d;

* transform: translate rotate

## 15.CSS3动画具体怎么写？

* transtion 过渡动画

* anmation keyframe关键帧订购

  ```js
  // 过渡动画和关键帧动画的区别
  1.过渡动画需要有状态变化
  2.关键帧动画不需要状态变化
  3.关键帧动画能控制更精细
  
  // 过渡 transition
   .ice {
       transition：all（需要变化的属性 如:width） 1s
   }
   .ice:hover {
       width: 200
   }
  
  //关键帧
      .ice {
          position: relative;
          width: 100%;
          height: 300px;
          background: url(images/bg1.png);
      }
  .bear {
      position: absolute;
      bottom: 0;
      width: 200px;
      height: 100px;
      background: url(images/bear.png) no-repeat;
      animation: bear 1s steps(8) infinite,  move 5s ease-in-out forwards;
  
  }
  @keyframes bear{
      from{
          background-position: 0 0;
  
      }
      to{
          background-position: -1600px 0;
      }
  }
  @keyframes move{
      from{
          left: 0;
  
      }
      to{
          left: 50%;
          transform: translateX(-50%);
    }
  }
  ```

## 16.CSS3动画性能？

* 性能不坏，改进空间小
* 部分情况下由于JS，但是JS做到更好，更精细化
* 部分高危属性吃CPU，如box-shadow等