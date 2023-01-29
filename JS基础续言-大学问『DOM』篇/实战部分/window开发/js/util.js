function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else {
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop,
    }
  }
}

// 获取HTML窗口宽高
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

// 鼠标位置兼容写法
function pagePos(e) {
  var sLeft = getScrollOffset().left, // 获取滚动条距里
    sTop = getScrollOffset().top,
    cLeft = document.documentElement.clientLeft || 0, // clientLeft IE8的文档偏移, 有可能不存在, 不存在就默认为0[没有偏移]
    cTop = document.documentElement.clientTop || 0;

  return {
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop
  }
}

// 获取当前元素样式
function getStyles(elem, prop) {
  if (window.getComputedStyle) {
    if (prop) {
      return window.getComputedStyle(elem, null)[prop];
    } else {
      return window.getComputedStyle(elem, null)
    }
  } else {
    if (prop) {
      return elem.currentStyle[prop];
    } else {
      return elem.currentStyle;
    }
  }
}

// 绑定事件兼容性写法
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

// 解绑事件兼容性写法
function removeEvent(elem, type, fn) {
  if (elem.removeEventListener) {
    elem.removeEventListener(type, fn, false);
  } else if (elem.detachEvent) {
    elem.detachEvent('on' + type, fn)
  } else {
    elem['on' + type] = null;
    // elem['on' + type] = false;
  }
}

// 取消冒泡
function cancelBuble(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBuble = true;
  }
}

// 取消默认事件
function preventDefaultEvent(e) {
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
}