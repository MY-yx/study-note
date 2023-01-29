// 插件化开发写法
;
(function () {
  var wHeight = getViewportSize().height, // 窗口高度
    sHeight = getScrollSize().height, // 文档高度
    playing = false,
    timer = null;

  var AutoReader = function (options) {
    this.playBtn = options.playBtn;
    this.sTopBtn = options.sTopBtn;

    var _self = this;
    addEvent(this.sTopBtn, 'click', function () {
      // 这里面的this指向指向的是elem => this.sTopBtn
      window.scrollTo(0, 0);
      timer && (clearInterval(timer));
      _self.playBtn.style.backgroundImage = 'url(./img/play.png)';
    });

    addEvent(window, 'scroll', function () {
      // 这里面的this指向指向的是elem => this.sTopBtn
      _self.sTopBTnShow();
    });

    addEvent(this.playBtn, 'click', function () {
      _self.setAutoPlay();
    });

  }

  AutoReader.prototype = {
    sTopBTnShow: function () {
      var sTop = getScrollOffset().top,
        sTopBtn = this.sTopBtn;
      sTopBtn.style.display = sTop ? 'block' : 'none';
    },
    setAutoPlay: function () {
      // 到低端时停止滚动
      var sTop = getScrollOffset().top,
        _self = this.playBtn;
      if (sHeight === wHeight + sTop) {
        // 走到底了
        return;
      }
      if (!playing) {
        // 如果没有滚动 => 开启定时器
        timer = setInterval(function () {
          sTop = getScrollOffset().top;
          if (sHeight <= wHeight + sTop) {
            // 到底部时需要停止
            clearInterval(timer);
            _self.style.backgroundImage = 'url(./img/play.png)';
            playing = false
          } else {
            window.scrollBy(0, 1);
            _self.style.backgroundImage = 'url(./img/pause.png)';
          }
        }, 10);
        playing = true;
      } else {
        clearInterval(timer);
        _self.style.backgroundImage = 'url(./img/play.png)';
        playing = false
      }
    }
  }

  window.AutoReader = AutoReader
})()