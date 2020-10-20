# JavaScript基础

## 1.引用类型

* 值类型

* 引用类型

  > 强制类型转换和隐式类型转换
  >
  > 强制：parseInt parseFloat toString
  >
  > 隐式：if、逻辑运算、==、+字符串拼接

## 2.深拷贝

```js
/**
 * 深拷贝
 * @param {object} obj 要拷贝的对象
 */
function deepClone (obj) {
  // 判断类型 输入的是否为 对象或者数组
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  // 初始化返回结果
  let result
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }
  
  for (let key in obj) {
    // 保证key不是原型的属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用 ！！！ 遍历复杂的结构
      result[key] = deepClone(obj[key])
    }
  }
  // 返回结果
  return result
}
```

## 3.if-else判断条件（true类 和 false类）

* !!x === true  truly类
* !!x === false  truly类

```
以下都为false类变量，其余都为true类变量
!!0 === false
!!NaN === false
!!'' === false
!!null === false
!!undifined === false
!!false === false
```

## 4.什么时候用 == 什么时候用===

 ==会造成类型转换

```js
1. 对象==字符串  将对象toString成字符串
2. null==undefined 相等，与其他都不相等
3. NaN==NaN  和自身都不想等
4. 其余类型都转化为字符串
```



```js
//除了==null之外，其他都一律用===，例如:
const obj = { x:100 }
if (obj.a == null) { }
//相当于:
// if (obj.a === null | obj.a === undefined) { }
```

## 5.事件循环和任务队列 

```
由于JS是单线程的，当JS在执行任务过程中，会将事件放到任务队列当中，如果事件中存在异步（DOM、网络请求、定时任务，图片加载等），会将该事件交由WEB API执行，执行完了之后，将结果返回，重新放入任务队列中，如果返回的结果还有异步请求，则重新执行以上过程
```





## 6.闭包

```js
// 1. 函数作为返回值
    function create() {
      let a = 100
      return function () {
        console.log(a);
      }
    }

    let fn = create()
    let a = 200
    fn()	 100
// 2. 函数作为参数
    function print(fn) {
      let a = 200
      fn()
    }
    let a = 100
    function fn() {
      console.log(a);
    }
    print(fn)	100
// 闭包：所有自由变量的查找，是在函数定义的地方，向上级作用域查找
//  不是在执行的地方 !!!!
// 影响：变量会常驻内存，得不到释放
```

## 7.this

```js
this的不同场景应如何取值
// 1. 当作普通函数被调用  window
// 2. 使用call bind apply  传入什么就只想什么
// 3. 作为对象方法调用	 当前对象
// 4. class   当前实例
// 5. 箭头函数 箭头函数中的this是取上级作用域的值	
```



## 8.手写bind函数

#### 相同点

都可以改变this指向

#### 三者区别

- call和apply都会调用函数,bind不会调用函数
- call和apply传递的参数不一样,call传递的参数 " arg1,arg2",apply必须传递数组形式为[arg]

```js
 JS手写call、bind、apply
bind
    Function.prototype.bind1 = function () {
      // ES6
      let args = Array.from(arguments)
      // ES5
      //let args = Array.prototype.slice.call(arguments)
      // 获取数组第一项
      let top = args.shift()
      // fn1.bind(...) 中的 fn1
      let self = this

      // 返回一个函数
      return function () {
        return self.apply(top, args)
      }
    }
    function fn1(a, b) {
      console.log('当前this：', this);
      console.log(a,b);
      return 'this is actions' 
    }
    //fn1(1,2)
    let fn2 = fn1.bind1({x: 100},1,2)
    let res = fn2()
    console.log(res);

call方法的实现

　　Function.prototype.MyCall = function(content,...args){

　　　　const self = content || window;

　　　　const args = args.slice(1)

　　　　const self.fn = this

　　　　const result = self.fn(args)

　　　　delete self.fn

　　　　return result

　　}

apply方法实现,和call方法差不多

　　Function.prototype.MyApply = function(content,args = []){

　　　　const self = content || window

　　　　self.fn = this;

　　　　let result = null

　　　　if(args.length > 0){

　　　　　　const  = self.fn(args)

　　　　}else {

　　　　　　result = self.fn()

　　　　}

　　　　delete self.fn

　　　　return result

　　}
```



## 9.手写instanceof函数

```js
const instanceOf = (a, b) => {
  let p = a
  while (p) {
    if (p === b.prototype) {
      return true
    }
    p = p.__proto__
  }
  return false
} 
```

## 10.同步和异步的区别是什么?

* JavaScript是单线程的
* 同步会阻塞代码
* 异步不会阻塞代码



## 11.手写用Promise加载一张图片

Promise解决的是回调地狱的问题

```js
function loadImg(url) {
      return new Promise((resolve, reject) => {
        const img = document.createElement('img')
        img.onload = () => {
          resolve(img)
        }
        img.onerror = () => {
          const err = new Error(`加载${url}，出错啦`)
          reject(err)
        }
        img.src = url
      })
}
```





## 12.前端使用异步的场景有哪些?

* 网络请求
* 定时任务

## 13.DOM

* 将DOM查询做缓存

* 将频繁的操作改成一次性操作

  ```js
  const div1 = document. getElementById( 'div1' )
  //添加新节点
  const p1 = document. createElement('p')
  p1. innerHTML = 'this is p1 '
  div1. appendChild(p1) //添加新创建的元素
  //移动已有节点。注意是移动! ! !
  const p2 = document . getElementById('p2')
  div1. appendChild(p2)
  ```

```js
  // 将频繁的操作改成一次性操作
  const listNode = document.getElementById('list')
  // 创建一个文档碎片，此时还没有插入到DOM树中
  const frag = document.createDocumentFragment()
  for (let index = 0; index < 10; index++) {
      let li = document.createElement('li')
      li.innerHTML = `${index}`
      frag.appendChild(li)
  }
  listNode.appendChild(frag)
```

## 14.事件绑定函数

```js
// 通用绑定函数
function bindEvent(elem, type, selector, fn) {
    // 判断是否为事件代理
    if (fn == null) {
        fn = selector
        selector = null
    }
    elem.addEventListener(type, event => {
        const target = event.target
        if (selector) {
            // 代理绑定
            if (target.matches(selector)) {
                fn.call(target, event)
            }
        } else {
            // 普通绑定
            fn.call(target, event)
        }      
    })
}

bindEvent(div1, 'click', 'p', function(event) {
    console.log(this.innerHTML);
})

bindEvent(div1, 'click', function(event) {
    console.log(this.innerHTML);
})
```



## 15.XMLHttpRequset

```js
// 手写简易版Ajax
function ajax(methods, url) {
    const res = new Promise((resovle, reject) => {
        const xhr = new XMLHttpRequset()
        xhr.open(methods, url, true)
        xhr.readystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resovle(JSON.parse(responseText))
                } else if(xhr.status === 404) {
                    reject(new Error('404 nos found'))
                } else if(xhr.status === 500) {
                    reject(new Error('500 server error))
                }
            }
        }
        xhr.send(null)
    })
    return res
}
xhr.open(methods, url, async)
async 一个可选的布尔参数，默认为true，表示要不要异步执行操作。如果值为false，send()方法直到收到答复前不会返回。如果true，已完成事务的通知可供事件监听器使用。如果multipart属性为true则这个必须为true，否则将引发异常。 
```

```js
// get请求和post请求区别
1. get一般用于查询操作(获取数据)，post一般用于用户提交操作（发送数据）
2. get参数拼接再url上（大小受url地址限制），post放在请求体中（数据体积更大）
3. get是明文的，post较安全，易于防止CSRF
```



## 16.同源策略和跨域

### 同源策略

* ajax请求时，浏览器要求当前网页和 server 必须同源（安全）

* 同源：协议、域名、端口，三者必须一致

  ```js
  加载图片Css js可无视同源策略
  ◆<img />可用于统计打点,可使用第三方统计服务
  ◆<link/> <script>可使用CDN，CDN -般都是外域
  ◆<script> 可实现JSONP
  ```

### 跨域

* 所有的跨域，都必须经过 server 端允许和配合
* 未经 server 端允许就实现跨域，说明浏览器有漏洞，危险信号

```js
1. JSONP
◆<script> 可绕过跨域限制
◆服务器可以任意动态拼接数据返回
◆所以，<script>就可以获得跨域的数据,只要服务端愿意返回

<script>
 callback = function(data) {
    console.log(data)
}
</script>
<script src="localhost:8081/jsonp.js"></script>

jsonp.js
callback({name: 'jsonp'})



```

```js
2. document.domain 基础域名相同 子域名不同 
3. window.name 利用在一个浏览器窗口内，载入所有的域名都是共享一个window.name
4. 服务器设置对CORS的支持 原理：服务器设置Access-Control-Allow-Origin HTTP响应头之后，浏览器将会允许跨域请求
```

```js
5. 利用h5新特性window.postMessage()

window.postMessage(message, targetOrigin) 方法允许我们在两个窗口（和iframe）之间实现跨域发送和接收数据

message: 需要发送到另一个窗口的数据（一个字符串或者对象）
targetOrigin: 消息要发往的窗口的 URL 。目标窗口的协议，端口和域名必须匹配。输入 “*” 会匹配任意 URL 但为了安全起见不建议那么做。

// 发送消息
有2种方式可以获得目标窗口：
通过 window.open() 方法，此方法会返回所需的窗口对象；
对于 iframe，contentWindow 属性会返回需要的 iframe 窗口
targetWindow=iframe.contentWindow;
targetWindow.postMessage('Hello World!','http://example.com');

// 接受消息
window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
  // For Chrome, the origin property is in the event.originalEvent
  // object. 
  // 这里不准确，chrome没有这个属性
  // var origin = event.origin || event.originalEvent.origin; 
  var origin = event.origin
  if (origin !== "http://example.org:8080")
    return;

  // ...
}


data
    从其他 window 中传递过来的对象。
origin
    调用 postMessage  时消息发送方窗口的 origin . 这个字符串由 协议、“://“、域名、“ : 端口号”拼接而成。例如 “https://example.org (隐含端口 443)”、“http://example.net (隐含端口 80)”、“http://example.com:8080”。请注意，这个origin不能保证是该窗口的当前或未来origin，因为postMessage被调用后可能被导航到不同的位置。
source
    对发送消息的窗口对象的引用; 您可以使用此来在具有不同origin的两个窗口之间建立双向通信。 
```





![1596114140364](C:\Users\11310\AppData\Roaming\Typora\typora-user-images\1596114140364.png)

![1596114279417](C:\Users\11310\AppData\Roaming\Typora\typora-user-images\1596114279417.png)

## 17.存储

### cookie

* 本身用于浏览器和 server通讯
* 被 “借用” 到本地存储来
* 操作 document.cookie = ''”        document.cookie

#### localStorage、sessionStorage

H5 存储

```js
localStorage/sessionStorage
// 增加
localStorage.setItem('myCat', 'Tom');

// 读取 localStorage
let cat = localStorage.getItem('myCat');

// 移除 localStorage 项
localStorage.removeItem('myCat');

// 移除所有
localStorage.clear();

```

### 区别

* 相同点 都是保存在浏览器端，且同源的。

* 不同点

  - cookie数据始终在同源的http请求中携带，即cookie在浏览器和服务器间来回传递。
  - 而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。
  - cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。 存储大小限制也不同，cookie数据不能超过**4k**，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据。
  - sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到**5M**或更大。 数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；
  - localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；
  - cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。 作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；
  - localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。


## 18.从输入URL到页面加载找个过程发生了什么？

* DNS解析:域名->IP地址  查询浏览器缓存
* 浏览器根据IP地址向服务器发起http请求
* 服务器处理http请求,并返回给浏览器

### 下载资源

```
HTML
媒体文件 MIME
CSS JS
```



### 页面渲染

```
根据HTML代码生成DOM Tree
根据CSS代码生成CSSOM
将DOM Tree和CSSOM整合行程Render Tree

根据Render Tree渲染页面
遇到<script>则暂停渲染,优先加载并执行JS代码,完成再继续
直至把Render Tree渲染完成

```

## 19.window.onload 和 DOMContentLoaded

```javascript
window.addEventListener( 'load'，function () {
//页面的全部资源加载完才会执行，包括图片、视频等
})
document.addEventListener( 'DOMContentLoaded', function () {
// DOM渲染完即可执行，此时图片、视频还可能没有加载完
})
```

## 20.性能优化

### 加载

* 减少资源体积:压缩代码

  > 压缩代码、合并代码使用--打包工具webpack

* 减少访问次数:合并代码, SSR服务器端渲染,缓存

  > CSS--雪碧图
  > SSR服务器端渲染-- 将页面和数据一起渲染
  >
  > 缓存：打包工具webpack---contenthash
  >  ◆静态资源加hash后缀,根据文件内容计算hash
  >  ◆文件内容不变,则hash不变,则url不变
  >  ◆url 和文件不变,则会自动触发http缓存机制,返回304

* 使用更快的网络: CDN

### 渲染

* CSS放在head,JS放在body最下面

* 尽早开始执行JS，用DOMContentLoaded触发、

  > document . addEventListener( 'DOMContentLoaded', function () {
  > // DOM渲染完即可执行，此时图片、视频还可能没有加载完
  > })

* 懒加载(图片懒加载, 上滑加载更多)

  > 将img标签的src链接设为同一张图片（比如空白图片，预览图），然后给img标签设置自定义属性（比如 data-src）,然后将真正的图片地址存储在data-src中，当JS监听到该图片元素进入可视窗口时，将自定义属性中的地址存储到src属性中。达到懒加载的效果。

  ```js
   <div class="container">
          <img src="pre.png" alt="1" datasrc="1.jpg">
   </div>
  <script>
  
       // 一开始没有滚动的时候，出现在视窗中的图片也会加载
       start();
  
      // 当页面开始滚动的时候，遍历图片，如果图片出现在视窗中，就加载图片
      var clock; //函数节流
      $(window).on('scroll',function(){
          if(clock){
              clearTimeout(clock);
          }
          clock = setTimeout(function(){
              start()
          },200)
      })
  
      function start(){
          $('.container img').not('[data-isLoading]').each(function () {
              if (isShow($(this))) {
                  loadImg($(this));
              }
          })
      }
  
  
      // 判断图片是否出现在视窗的函数
      function isShow($node){
          return $node.offset().top <= $(window).height()+$(window).scrollTop();
      }
  
      // 加载图片的函数，就是把自定义属性data-src 存储的真正的图片地址，赋值给src
      function loadImg($img){
          $img.attr('src', $img.attr('data-src'));
  
          // 已经加载的图片，我给它设置一个属性，值为1，作为标识
          // 弄这个的初衷是因为，每次滚动的时候，所有的图片都会遍历一遍，这样有点浪费，所以做个标识，滚动的时候只遍历哪些还没有加载的图片
          $img.attr('data-isLoading',1);
      }
  
  </script>
  ```

  

* 对DOM查询进行缓存

  ```js
  const div1 = document.getElementById( 'div1' )
  //添加新节点
  const p1 = document.createElement('p')
  p1.innerHTML = 'this is p1 '
  div1.appendChild(p1) //添加新创建的元素
  //移动已有节点。注意是移动! ! !
  const p2 = document.getElementById('p2')
  div1.appendChild(p2)
  ```

  

* 频繁DOM操作,合并到一起插入DOM结构

  ```js
  // 将频繁的操作改成一次性操作
  const listNode = document.getElementById('list')
  // 创建一个文档碎片，此时还没有插入到DOM树中
  const frag = document.createDocumentFragment()
  for (let index = 0; index < 10; index++) {
      let li = document.createElement('li')
      li.innerHTML = `${index}`
      frag.appendChild(li)
  }
  listNode.appendChild(frag)
  ```

  

* 节流throttle防抖debounce

  > 手写防抖

  ```js
  // 防抖
  function debounce(fn, delay = 500) {
        let timer = null
        return function () {
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
          }, delay)
        }
      }
  input1.addEventListener('keyup', debounce(function() {
      console.log(input1.value);
  }, 500))
  ```

  > 手写节流

  ```js
  // 节流
  function throttle(fn, delay = 100) {
        let timer = null
        return function () {
          if (timer) {
            return
          }
          timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
          }, delay)
        }
      }
  div1.addEventListener('drag', throttle(function (e) {
      console.log(e.offsetX, e.offsetY);
  }), 100)
  ```

  #### 区别

  > 防抖：将几次操作合并为一此操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。
  >
  > 节流：使得一定时间内只触发一次函数。原理是通过判断是否到达一定时间来触发函数。
  >
  > 区别： 函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触发一次函数。 比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。

## 21.常见的Web安全及防护

* SQL注入：是将sql代码伪装到输入参数中，传递到服务器解析并执行的一种攻击手法。

>  举例子：在一些对server端发起的请求参数中植入一些sql代码，server端在执行sql操作时，会拼接对应参数同时也将一些sql注入攻击的“sql”拼接起来，导致会执行一些预期之外的操作。 		
>
>  防范：
>
>  1. 对用户输入进行校验 
>
>  2. 不适用动态拼接sql

* XSS（跨站脚本攻击)：往web页面插入恶意的html标签或者js代码。

> 举例子：在论坛放置一个看是安全的链接，窃取cookie中的用户信息 	
>
> 防范
>
> 1. 使用 npm xss包  npm i xss
>
> 2. 替换特殊字符，如<变为&lt; >变为&gt    
>
> 3. <script>变为&lt;script&gt; , 直接显示,而不会作为脚本执行    

* CSRF(跨站请求伪装)：通过伪装来自受信任用户的请求 			

> 举例子：利用CSRF跨站请求伪装来获取数据，利用你的用户信息，进行接口访问 			
>
> 防范：
>
> 1. 尽量采用post而不使用get提交表单
>
> 2. 增加验证，例如：密码，短信验证码，指纹

XSS和CSRF的区别：    

1. XSS是获取信息，不需要提前知道其他用户页面的代码和数据包   

2. CSRF代替用户完成指定的动作，需要知道其他页面的代码和数据包

## 22.数组常用API

### 纯函数

![1596339559420](C:\Users\11310\AppData\Roaming\Typora\typora-user-images\1596339559420.png)

### 非纯函数

> arr.push(50)   	return length
>
> arr.pop()   		  return arr[lengtn -1]
>
> arr.shift()   	 	return arr[0]
>
> arr.unshift(50)   return length

### split和join

> **split()**  方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。 String.prototype.split()
>
> **join()** 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。 Array.prototype.join()

![1596339619900](C:\Users\11310\AppData\Roaming\Typora\typora-user-images\1596339619900.png)

### slice和splice

> **slice()**  方法返回一个新的数组对象，这 一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。原始数组不会被改变。
>
> **splice()** 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

## 23.手写isEqual

![1596358149612](C:\Users\11310\AppData\Roaming\Typora\typora-user-images\1596358149612.png)

![1596358535173](C:\Users\11310\AppData\Roaming\Typora\typora-user-images\1596358535173.png)

![1596359367148](C:\Users\11310\AppData\Roaming\Typora\typora-user-images\1596359367148.png)



![1596360005070](C:\Users\11310\AppData\Roaming\Typora\typora-user-images\1596360005070.png)

![1596360155145](C:\Users\11310\AppData\Roaming\Typora\typora-user-images\1596360155145.png)