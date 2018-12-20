// 实现一个深度克隆方法

/*
 *  1、无递归实现，只能clone简单的对象，对象里面不能包含对象
 */
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
 *  2、递归实现，无法clone对象的constructor属性
 */

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
 *  3、最终实现
 */
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
