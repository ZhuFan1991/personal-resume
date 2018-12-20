// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组

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

/*---------------------------------------------------------------*/
/*
 *  方法二：数组下标判断法（性能和方法一差不多）
 *    实现思路：如果当前数组的第 i 项在当前数组中第一次出现的位置不是 i，那么表示第 i 项是重复的，忽略掉。否则存入结果数组。
 */
function uniqArray(arr) {
    var newArr = [];
    for (var i=0, k=arr.length; i<k; i++){
      if (arr.indexOf(arr[i]) == i){
        // newArr[i] = arr[i];
        newArr.push(arr[i]);
      }
    }
    return newArr;
}

/*---------------------------------------------------------------*/
/*
 *  方法三：排序后相邻去除法
 *    实现思路：给传入的数组排序，排序后相同的值会相邻，然后遍历排序后数组时，新数组只加入不与前一值重复的值。
 */
 function uniqArray(arr) {
     arr.sort();
     var newArr = [arr[0]];
     for (var i=1, k=arr.length; i<k; i++){
       if (arr[i] != newArr.(newArr.length-1))){
         // newArr[i] = arr[i];
         newArr.push(arr[i]);
       }
     }
     return newArr;
 }
/*
 *  ◆ 存在的问题：
 *    此方法因为对arr调用了sort函数，所以会改变arr的排序。
 */

 /*---------------------------------------------------------------*/
 /*
  *  方法四：优化遍历数组法（推荐）
  *    实现思路：双层循环，外循环表示从0到arr.length，内循环表示从i+1到arr.length。将没重复的右边值放入新数组。（检测到有重复值时终止当前循环同时进入外层循环的下一轮判断）
  */
 function uniqArray(arr) {
     var hash=[];
     label:
     for (var i = 0; i < arr.length; i++) {
         for (var j = i+1; j < arr.length; j++) {
             if(arr[i]===arr[j]){
                 continue label;
             }
         }
         hash.push(arr[i]);
     }
     return hash;
 }


 // 测试用例
 var a = [1, 3, 5, 7, 5, 3];
 var b = uniqArray(a);
 console.log(b); // [1, 3, 5, 7]
