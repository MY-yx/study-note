```javascript
function test(a, b, c) {
	console.log(arguments)
	console.log(arguments.toString()) // [object Arguments]
	console.log(Array.isArray(arguments)) // false
	console.log(arguments.callee)
	// 宿主函数;test本身，甚至可以直接写test();使用arguments.callee的话JS引擎无法优化，这也是为什么严格模式不允许使用callee和caller
	var it = generator(arguments)
	console.log(it.next())
	console.log(it.next())
	console.log(it.next())
	console.log(it.next())
}

test(1, 2, 3)

function generator(agrs) {
	for (var v of agrs) {
		yield v
	}
}

var obj = {
	a: 1,
	b: 2,
	c: 3
} // 普通对象不可迭代

var it = generator(obj)
console.log(it.next()) // Uncaught SyntaxError: Unexpected identifier

// 不定参数时：箭头函数抛弃了arguments，只能用...args来获取
var test1 = (...args) => {
	console.log(arguments); // undefined
	// 
	console.log(args); // [1, 2, 3]
	console.log(Array.isArray(args)) // true
}
test1(1, 2, 3)

// => JS正在慢慢淡化arguments
```
```javascript
function test() {
  // 已知我们可以通过Array.prototype.slice去将类数组转换为数组
	// 但slice用在arguments身上会组织JS引擎做一些特定的优化；实际上是一种破坏(原因不具体拓展)
	// 不建议返回(泄露)或者加工内置对象
	// var argArr = Array.prototype.slice.call(arguments);
	// console.log(argArr); [1, 2, 3]
 // 可以通过遍历的方式解决上述问题
	var argArr = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
}
test(1, 2, 3, 4)

// arguments最大的用处就是保存实参
// (1)实参个数 > 形参个数； (2)不定参数；
function test1(a, b, c) {
	console.log(arguments[3]); // 4
	for(var i = 0; i < arguments.length; i++) {
	  arguments[i] += 1; // 这种情况arguments会改变
	}
}
test1(1, 2, 3, 4)
```
```javascript
function test(a = 100) {
  /**
	* (1)形实参再默认情况下是会有对映关系的;
	* (2)实参有默认值(哪怕只有一个)情况,形实参不再互相对应;
	*/
	// (1) 普通情况
	// a = 100;
	// console.log(a, arguments[0]); // 100, 100
	// (2) 实参有默认值情况
	arguments[0] = 10;
	console.log(a, arguments[0]); // 1, 10
}

test(1);
// arguments的作用越来越小了

// Bug环节[上述所描述单反一个实参有默认值时对映关系都会消失了]
function test1(a, b, c = 10) {
	arguments[0] = 100;
	arguments[1] = 200;
	arguments[2] = 300;
	console.log(a, arguments[0]); // 1, 100
	console.log(b, arguments[1]); // 2, 200
	console.log(c, arguments[2]); // 3, 300
}
test1(1, 2, 3);

// 由以下例子可以看出,越往es6, arguments的作用越弱,args更偏向形参。
function test2(...args) {
	arguments[0] = 100;
	arguments[1] = 200;
	arguments[2] = 300;
	console.log(args[0], arguments[0]); // 1, 100
	console.log(args[1], arguments[1]); // 2, 200
	console.log(args[2], arguments[2]); // 3, 300
}
test2(1, 2, 3);

// 这种情况对映关系也消失了
function test2({a, b, c}) {
	arguments[0] = 100;
	arguments[1] = 200;
	arguments[2] = 300;
	console.log(a, arguments[0]); // 1, 100
	console.log(b, arguments[1]); // 2, 200
	console.log(c, arguments[2]); // 3, 300
}
test2({
  a: 1,
	b: 2,
	c: 3
});
```
```javascript
function test(a, b, c) {
	// es5中(严格模式下) callee, caller
  'use strict';
	a = 10;
	b = 20;
	c = 30;
	arguments[0] = 100;
	arguments[1] = 200;
	arguments[2] = 300;
	// 此时对映关系直接消失了
	console.log(a, b, c);
	console.log(arguments); 
}

test(1, 2, 3)
```
