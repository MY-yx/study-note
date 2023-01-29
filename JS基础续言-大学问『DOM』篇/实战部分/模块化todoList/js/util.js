function addEvent(elem, type, fn) {
  if (elem.addEventListener) {
    elem.addEventListener(type, fn, false);
  } else if (elem.attchEvent) {
    elem.attchEvent(type, function () {
      fn.call(elem);
    })
  } else {
    elem['on' + type] = fn;
  }
}

function elemParent(node, num) {
  var type = typeof (num);
  if (!num || num < 0 || type !== 'number') {
    return undefined;
  }
  while (num) {
    if (node.nodeName === 'HTML') {
      return undefined;
    }
    node = node.parentNode;
    num--;
  }
  return node;
}

function elemChildren(elem) {
  var childNodes = elem.childNodes || [],
    len = childNodes.length || 0,
    arr = []; // return的结果
  for (var i = 0; i < len; i++) {
    var childItem = childNodes[i]; // 优化性能
    if (childItem.nodeType === 1) {
      // 元素节点nodeType === 1
      arr.push(childItem);
    }
  }
  return arr;
}

function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      top: window.pageYOffset,
      left: window.pageXOffset
    }
  } else {
    // 解决IE兼容性问题
    return {
      top: document.documentElement.scrollTop + document.body.scrollTop,
      left: document.documentElement.scrollLeft + document.body.scrollLeft
    }
  }
}

function getViewportSize() {
  // 首先判断是否存在window.innerWidth方法
  if (window.innerWidth) {
    return {
      width: window.innerWidth, // [包括滚动条, ES5]
      height: window.innerHeight
    }
  } else {
    if (document.compatMode === 'CSS1Compat') {
      return {
        width: document.documentElement.clientWidth, // [包括滚动条]
        height: document.documentElement.clientHeight
      }
    } else {
      return {
        width: document.body.clientWidth, // [不包括滚动条]
        height: document.body.clientHeight
      }
    }
  }
}

function getScrollSize() {
  if (document.body.scrollHeight) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}