<a name="UGjTi"></a>
## 基本使用 && 介绍
```javascript
四种相等判断的算法
三等 ===
等于 ==
等值相等 -0 === +0
同值相等 -0 !== +0  NaN !== NaN

JS中提供有关相等判断的操作方法
严格相等 === Strict Equality
非严格(抽象/非约束)相等 == Loose(自由的、不受限制的)Equality
Object.is(v1, v2) ES6新API，判断两个参数是否是同一个值
```
<a name="h8xjA"></a>
### 严格相等 ===
```javascript
/**
 * === 严格相等
 * 
 * 不进行隐式类型转换 - 类型相同/值也相同
 * 1 === '1'; =>  false   1 === 2; => false
 * 
 * 引用值的情况必须是同一地址
 * var obj = {};  obj === obj; => true  {} === {}; => false
 * 
 * 两个NaN或者是NaN跟其他值都不相等
 * NaN === NaN; => false
 * 
 * +0和-0相等吗？
 * +0 === -0; => true
 * +Infinity和-Infinity相等吗？
 * +Infinity === -Infinity; => false
 * 
 * 如何定义变量a => a !== a; true 那么答案很简单就是NaN
 * 全等对结果的预测是更加清晰明确的；
 * 全等在不隐式类型转换的情况下更快
 */ 
```
<a name="GKu6g"></a>
### 非严格相等 ==
```javascript
/**
 * 非严格相等
 * 会进行隐式类型转换 -> 等式两边都有可能被转换 -> 转换后还是会根据严格相等来判断; [MDN如何判断相等]
 * 
 * ToPrimitive(A): 使用a.toString()和a.valueOf()尝试将参数a转换为原始值
 * 任何对象和null || undefined都不相等;除了窄对象
 * 窄对象: Narrow Object -> document.all['div']  -> typeof document.all => 'undefined'  document.all == undefined; => true
 */
```
<a name="l3C0E"></a>
### falsy值
```javascript
/**
 * falsy值  8个
 * false || +0/-0 || 8n ||  ""/''/`` || null || undefined || NaN
 */
```
<a name="LWSR6"></a>
### 同值相等 && 零值相等
```javascript
/**
 * 同值相等: same-value -> 底层实现 Object.is() (ES6才有，ES5没有同值相等概念)
 * 零值相等: same-value-zero -> +0 === -0 true
 * 
 * -0 !== +0 => 同值相等，例1
 * NaN === NaN => 同值相等，例2
 */
```
<a name="MftKr"></a>
#### 例1
```javascript
var obj = {};
// 例1
Object.defineProperty(obj, 'myZero', {
  value: -0,
  writable: false,
  enumerable: false,
  configurable: false
});
// 此时重现定义时
Object.defineProperty(obj, 'myZero', {
  value: -0,
  // value: 0 || +0 => 这时会抛出异常，不能重新定义myZero
});
```
<a name="uc4hS"></a>
#### 例2
```javascript
var obj = {};
// 例2
Object.defineProperty(obj, 'myValue', {
  value: NaN,
  writable: false,
  enumerable: false,
  configurable: false
})
Object.defineProperty(obj, 'myValue', {
  value: NaN, // 这时不会抛出错位, 此时被认为NaN === NaN
})
```
<a name="zqJ7L"></a>
## Object.is
```javascript
/**
 * Object.is
 */
var a = +0,
    b = -0;
// var res = Object.is(a, b); // => false  同值相等概念
// var res = Object.is(obj, obj); // => true  同一个引用
// var res = Object.is({}, {}); // => false  不同引用
var res = Object.is(NaN, NaN); // => true  同值相等概念
```
<a name="S5hdo"></a>
## JS实现
```javascript
// 本质上还是全等，只不过需要注意的就是 +0 !== -0 且NaN === NaN 需要返回true即多了两个等值相等的规则
Object.myIs = function(a, b) {
  if(a === b) {
    // 这里需要多判断一层是否为0, === 没办法判断 +0 !== -0
    return a !== 0 || 1 / a === 1 / b;
    // 1 / +0 => Infinity 1 / -0 => -Infinity; a = 0时需要知道是+-0
  }
  return a !== a && b !== b;  // 需要在NaN, NaN时返回true, 其他都返回false => NaN !== NaN => true
}
```
