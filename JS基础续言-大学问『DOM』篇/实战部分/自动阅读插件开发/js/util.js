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
      width: window.innerWidth,  // [包括滚动条, ES5]
      height: window.innerHeight
    }
  } else {
    if (document.compatMode === 'CSS1Compat') {
      return {
        width: document.documentElement.clientWidth,  // [包括滚动条]
        height: document.documentElement.clientHeight
      }
    } else {
      return {
        width: document.body.clientWidth,  // [不包括滚动条]
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
