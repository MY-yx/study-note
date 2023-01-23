<a name="vcJwj"></a>
## 常见的7种数组遍历方法
1. forEach -> 普通的数组遍历方法 
2.  map -> 映射 -> 每次遍历返回一个数组元素
3.  filter -> 过滤 -> 每次遍历,返回boolean值来决定当前元素是否纳入新数组中
4.  reduce -> 归纳 -> 每一次遍历,将当前元素收归到容器中
5.  reduceRight -> 反向reduce
6.  every -> 判定是否所有元素都符合条件
7.  some -> 判断是否有某一个或多个符合条件
8. for循环  while
<a name="MM8yr"></a>
## 生成器 && 迭代器
```javascript
function* generator(arr) {
  for (var i = 0; i < arr.length; i++) {
    yield arr[i]
  }
  return 'test123'; // 单独return最后一项这个时候done才会使true
  // yield 'name';
  // yield 'age';
  // yield 'height';
  // yield 'weight';
  // return 'test123'
}

const arr = ['name', 'age', 'height', 'weight']

const iterator = generator(arr)
console.log(iterator.next()); // {value: "name", done: false} done: false -> 迭代未完成
console.log(iterator.next()); // {value: "age", done: false} done: false -> 迭代未完成
console.log(iterator.next()); // {value: "height", done: false} done: false -> 迭代未完成
console.log(iterator.next()); // {value: "weight", done: false} done: false -> 迭代未完成
console.log(iterator.next()); // {value: "name", done: true} done: false -> 迭代完成
```
<a name="X2Tol"></a>
## JS实现生成器&构造器
```javascript
// 生成器  函数
// 迭代器  生成器函数执行后返回的一个带有next方法的对象; next只要执行就会返回一个对象: {value: "XXX", done: false || true}
// 生成器对迭代的控制是由yield关键字来控制的

// 生成器
function gen(arr) {
  var nextIndex = 0;
  return { // 迭代器
    next: function () {
      return nextIndex < arr.length ? {
        value: arr[nextIndex++],
        done: false
      } : {
        value: arr[nextIndex++], // 最后的值肯定是undefined,但这个时候其实迭代已经结束，不必过于细扣这个概念
        done: true
      }
    }
  }
  // 通过闭包把nextIndex锁住
}
```
