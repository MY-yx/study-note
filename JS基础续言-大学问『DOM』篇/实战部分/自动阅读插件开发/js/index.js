;
(function () {
  var stopBtn = document.getElementsByClassName('s-top-btn')[0],
    header = document.getElementsByClassName('list-hd')[0];

  function handlerClickEvent() {
    window.scrollTo(0, 0); // 回到顶部
  }

  function handlerScrollEvent() {
    var sTop = getScrollOffset().top;
    stopBtn.style.display = sTop ? 'block' : 'none';
  }

  function init() {
    addEvent(window, 'scroll', handlerScrollEvent);
    addEvent(stopBtn, 'click', handlerClickEvent);
    addEvent(header, 'click', handlerClickEvent);
  }

  window.bookInit = init;
})()