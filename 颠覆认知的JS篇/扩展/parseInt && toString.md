<a name="ZCTLK"></a>
### parseInt
<a name="rrhV1"></a>
#### 1.1 简介
```javascript
/**
* parseInt(String, Radix)
* string: 需要一个字符串(如果传的不是字符串则会隐式调用toString()方法转换，且会自动晒出开头的空格)
* Radix: 2-36进制
* 返回值: 可解析的整数/NaN
*/
```
<a name="WyQ9X"></a>
#### 1.2 例子
```javascript
// (1) parseInt只认合理的部分解析
parseInt('1a'); // 1; 
parseInt('113', 2); // => parseInt('11', 2) => 3
parseInt('133', 2); // => parseInt('1', 2) => 1

// (2) parseInt转换进制
parseInt('01', 2); // 1
parseInt('123', 5); // 38 = 1 * Math.pow(5, 0) + 2 * Math.pow(5, 1) + 3 * Math.pow(5, 2)
parseInt('0x69eb'); // 0x是16进制的前缀; 27115
// 需要注意的是, 八进制不建议以0开头的来写
```
<a name="ec5VW"></a>
### toString
```javascript
toString与parseInt基本一致，只是实际使用场景相反；
('3').toString(2); // 10进制 -> 2进制
```
