# baidu-ife 2015年春季班 task-02 练习笔记

<br>
<br>
<br>

## 任务目的

掌握 `JavaScript` 基础知识，能够使用 `JavaScript` 编写一些复杂度不大的交互功能。

<br>
<br>

## 开始任务

<br>

### 任务一 JavaScript数据类型及语言基础

<br>

#### 期望达成

- 掌握JavaScript的各种数据类型概念、判断方法
- 掌握JavaScript函数、对象的概念
- 掌握字符串、数字、数组、日期等对象的方法
- 了解JavaScript的作用域
- 初步掌握正则表达式的写法

<br>

#### 任务实现

**1、实践判断各种数据类型的方法，并实现以下方法：**

```js
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return arr instanceof Array;
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return arr instanceof function;
}
```

<br>

**2、了解值类型和引用类型的区别，了解各种对象的读取、遍历方式，并使用递归来实现一个深度克隆方法：**

- 第一步：值类型和引用类型的判断：

```js
/*
 *  方式一：typeof 操作符（基本类型检测）
 */
var test1 = "string";
var test2 = new String("string2");
console.log(typeof test1);   //输出string
console.log(typeof test2);   //输出object

/*  
 *  ◆ 方式一存在的问题：
 *    所有通过构造器 constructor 产生的变量都是 object 类型，无法通过 typeof 进行判断。
 */

---------------------------------------------------------------
/*
 *  方式二：instanceof 操作符（引用类型检测）
 */
console.log(test1 instanceof String);    //输出false
console.log(test2 instanceof String);    //输出true

/*  
 *  ◆ 方式二存在的问题：
 *    instanceof 一般用于检测引用类型，检测值类型时会返回 false。
 */

---------------------------------------------------------------
/*
 *  方式三：Object.prototype.toString.call()（官方推荐的方法）
 */
console.log(Object.prototype.toString.call(test1))//输出[object String]
console.log(Object.prototype.toString.call(test1))//输出[object String]
```

关于 Object.prototype.toString.call() 的细节问题，可以参考下面的文章：

<u>[简书 - 深入理解Object.prototype.toString.call()](https://www.jianshu.com/p/e4237ebb1cf0)</u>

<br>

- 第二步：遍历问题：

```js
/*
 *  1、字符串的遍历（通过切片的方式完成遍历）
 */
var temp = src.split("");
var cloneString="";
for(var i=0, k = temp.length; i<k; i++)
{
    cloneString += temp[i];
}

/*  
 *  ◆ 使用 split 函数的原因：
 *    这里可以不使用 split 函数，可以在特殊的地方使用。
 *
 *  ◆ 使用变量存放字符串长度的原因：
 *    可以优化此循环的性能，每次循环可以不用再计算字符串的长度。
 */

---------------------------------------------------------------
/*
 *  2、数组的遍历（使用传统的方式完成遍历）
 */
var temp = new Array();
for (var i = 0, k = src.length; i < k; i++){
  temp[i] = src[i];
}

---------------------------------------------------------------
/*
 *  3、对象的遍历（一）（使用 for-in 的方式完成遍历）
 */
var temp = new Object();
for (var k in src){
  temp[k] = src[k];
}

/*
 *  4、对象的遍历（二）（使用 Object.keys() 和 forEach 结合的方式完成遍历）
 */
var temp = new Object();
Object.keys(src).forEach(function(key){
  temp[key] = src[key];
})
```

更多关于js遍历的问题，可以参考下面的文章：

<u>[CSDN - js中我最常用的几种遍历处理数据的方法梳理](https://blog.csdn.net/wanwan5856/article/details/79618024)</u>

<u>[博客园 - 简单了解JS中的几种遍历](https://www.cnblogs.com/Jacky-MYD/p/8984176.html)</u>

<br>

- 最终实现(无递归实现)：

```js
function cloneObject(src) {
    var result;
    switch (Object.prototype.toString.call(src)) {
      case "[object Number]":
        result = src;
        break;
      case "[object string]":
        for (var i = 0, k = src.length; i<k; i++){
          result += src[i];
        }
        break;
      case "[object Boolean]":
        result = src;
        break;
      case "[object Data]":
        result = src;
        break;
      case "[object Array]":
        var temp = [];
        for (var i = 0, k = src.length; i < k; i++){
          temp[i] = src[i];
        }
        result = temp;
        break;
      case "[object Object]":
        var temp = {};
        for (var k in src){
          temp[k] = src[k];
        }
        result = temp;
        break;
      default:
        break;
    }
    return result;
}

/*  
 *  ◆ 存在的问题：
 *    程序不够精简，也无法保留src的constructor属性。
 */
```

- 递归实现：

```js
// 判断src是否为一个数组，返回一个bool值
function isArray (src) {
    return Object.prototype.toString.call(src) === '[object Array]';  
}
// 深度克隆
function cloneObject(src) {
    // 判断src是否为object类型，并且不为function类型
    if(typeof src !== "object" && typeof src !== 'function') {
        return src;        //原始类型直接返回
    }
    var newObj = isArray(src) ? [] : {};
    for(prop in src) {  
        // 判断遍历出的属性是否为对象本身的属性，还是原型链属性(继承属性)
        if(src.hasOwnProperty(prop)){
            // 如果遍历出的还是对象，递归克隆这个对象
            newObj[prop] = typeof src[prop] === "object" ? cloneObject(src[prop]) : src[prop];
        }
    }
    return newObj;
}

/*  
 *  ◆ 存在的问题：
 *    虽然代码量精简了，而且也实现了递归算法，但无法保留src从原型继承的属性。
 */
```

- 最终实现：

```js
// 仅针对object类型的深复制
function cloneObject(src) {
    var newObj = src.constructor === Array ? []:{};
    newObj.constructor = src.constructor;

    if(typeof src !== "object"){
        return ;
    }
    else if(window.JSON){
        //若需要考虑特殊的数据类型，如正则，函数等，需把这个else if去掉即可
        newObj = JSON.parse(JSON.stringify(obj));
    }
    else {
        for(var prop in src){
            if(src[prop].constructor === RegExp || src[prop].constructor === Date){
                newObj[prop] = src[prop];
            }
            else if(typeof src[prop] === 'object'){
                //递归
                newObj[prop] = cloneObject(src[prop]);
            }
            else {
                newObj[prop] = src[prop];
            }
        }
    }
    return newObj;
}

/*  
 *  ◆ 存在的问题：
 *    虽然代码量精简了，而且也实现了递归算法，但无法保留src的constructor属性。
 */

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"
```

<br>

**3、学习数组、字符串、数字等相关方法，并实现以下函数：**

- 数组相关方法：

```js
// 1、对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组

/*
 *  方法一：遍历数组法（indexOf方法）
 *    实现思路：新建一个数组，遍历去要重的数组，当值不在新数组的时候（indexOf为-1）就加入该新数组中；
 */
function uniqArray(arr) {
   var newArr = [];
   for (var i=0, k=arr.length; i<k; i++){
     if (newArr.indexOf(arr[i]) == -1){
       // newArr[i] = arr[i];
       newArr.push(arr[i]);
     }
   }
   return newArr;
}

---------------------------------------------------------------
/*
 *  方法二：数组下标判断法（性能和方法一差不多）
 *    实现思路：如果当前数组的第 i 项在当前数组中第一次出现的位置不是 i，那么表示第 i 项是重复的，忽略掉。否则存入结果数组。
 */
function uniqArray(arr) {
    var newArr = [];
    for (var i=0, k=arr.length; i<k; i++){
      if (newArr.indexOf(arr[i]) == -1){
        // newArr[i] = arr[i];
        newArr.push(arr[i]);
      }
    }
    return newArr;
}

// 测试用例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]
```



```
// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
}

// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3
```
