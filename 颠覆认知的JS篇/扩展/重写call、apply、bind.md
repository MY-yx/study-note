<a name="uoWjE"></a>
## （1）call
call 和apply本质上就是参数不同,这里就具体以call为例了
```javascript
// (1)首先， 这三个方法都是Function.prototype上的方法
Function.prototype.myCall = function (context) {
	context = context || window;
	// 这里的this就是function, 我们只需要在对应的context上增加一个方法, 然后通过context去调用
	// 这样this指向就会被修改为指向context
	var _args = [];
	for (var i = 1; i < arguments.length; i++) {
		_args.push(arguments(i)); // 过滤第0项传参 -> 整体放入一个容器数组里
	}
	context.$fn = this;
	// '' + [1,2,3,4,5] + '' => "1,2,3,4,5"
	var result = eval("context.$fn(" + _args + ")");
	delete context.$fn;
	// 原来的作用域上不应该凭空多出来一个$fn
	return result;
}
```
<a name="jvamr"></a>
## （2）apply
```javascript
// apply和call的本质区别就在参数,
// xxx.call(this, a, b, c, d, ...);
// xxx.call(this, [a, b, c, d, ...]);
Function.prototype.myApply = function(context, args) {
  context = context || window;
  // 确保第二参数是个数组
  args = Object.prototype.toString.call(args) === '[object Array]' ? args : [];
	// 这里的this就是function, 我们只需要在对应的context上增加一个方法, 然后通过context去调用
	// 这样this指向就会被修改为指向context
	context.$fn = this;
	var result = eval("context.$fn(" + args + ")");
	delete context.$fn;
	// 原来的作用域上不应该凭空多出来一个$fn
	return result;
}
```
<a name="t0HZ6"></a>
## （3）bind
```javascript
// bind稍有不同
// xxx.bind(thisArg[, arg1[, arg2[, ...]]])
Function.prototype.myBind = function (context) {
  context = context || window;
  // 需要先将后面的传参取下来
  var args = [].slice.call(arguments, 1),
    $this = this;

  var fn = function () {
    // 以防万一有别的参数; xxx.bind(obj)(a, b, c, ...)
    var anotherArgs = [].slice.call(arguments, 0),
      finalArguments = args.concat(anotherArgs);
    $this.apply(context, finalArguments);
  }
  // 圣杯继承
  inhert(fn, $this); // => 需要让构造函数的原型可以被继承
  return fn
}

function inhert(Target, Origin) {
  var Buffer = function () {};
  Buffer.prototype = Origin.prototype
  Target.prototype = new Buffer();
  Target.prototype.constructor = Target;
  Target.prototype.super_class = Origin;
}
```
