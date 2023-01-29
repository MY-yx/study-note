;
(function (doc) {
  // doc -> 临时变量
  var oList = doc.getElementsByClassName('list')[0],
    oItems = doc.getElementsByClassName('item'),
    curIdx = 0;

  var init = function () {
    bindEvent();
  }

  function bindEvent() {
    // 可以实现, 但还是通过for循环去绑定
    // for (var i = 0; i < oItems.length; i++) {
    //   addEvent(oItems[i], 'mouseover', function () {
    //     oItems[curIdx].className = 'item';
    //     curIdx = Array.prototype.indexOf.call(oItems, this);
    //     oItems[curIdx].className += ' active'
    //   });
    // }

    // addEvent(oList, 'mouseover', slide);

    // mousemove 长触发; mouseover 短触发;  这样性能稍微好一些
    addEvent(oList, 'mouseover', function () {
      addEvent(doc, 'mousemove', slide);
    });

    addEvent(oList, 'mouseout', function () {
      removeEvent(doc, 'mousemove', slide);
    });
  }

  function slide(e) {
    // mouseover事件可以拿到所有元素
    var e = e || window.event,
      tar = e.target || e.srcElement,
      oParent = getParent(tar, 'li'), // 一层层向上直到找到li
      thisIdx = Array.prototype.indexOf.call(oItems, oParent); // 根据索引去判断当前是否有active
    if (curIdx !== thisIdx) {
      oItems[curIdx].className = 'item';
      curIdx = thisIdx;
      oItems[curIdx].className += ' active';
    }
  }

  function getParent(target, element) {
    // 因为绑定的顶层是oList => 这一层最高也就到li(li就找到了然后while(false){...} 结束循环了)
    while (target.tagName.toLowerCase() !== element) {
      target = target.parentNode;
    }
    return target;
  }

  init();

})(document)