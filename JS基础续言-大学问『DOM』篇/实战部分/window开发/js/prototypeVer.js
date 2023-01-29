;
(function () {
  var DragNclick = function (opts) {
    this.app = opts.app;
    this.menu = opts.menu;
    this.fn = opts.fn;

    // 使用状态(不修改)
    this.screenWidth = getViewportSize().width;
    this.screenHeight = getViewportSize().height;
    this.elemWidth = parseInt(getStyles(this.app, 'width'));
    this.elemHeight = parseInt(getStyles(this.app, 'height'));
    this.menuWidth = parseInt(getStyles(this.menu, 'width'));
    this.menuHeight = parseInt(getStyles(this.menu, 'height'));

    // 处理状态(需要修改)
    this.x = 0;
    this.y = 0;
    this.beginTime = 0;
    this.endTime = 0;
    this.clickBeginTime = 0;
    this.clickEndTime = 0;
    this.counter = 0;
    this.oPos = null;
    this.timer = null;
  }

  DragNclick.prototype = {
    init: function () {
      this.bindEvent();
    },
    bindEvent: function () {
      var _self = this;
      addEvent(this.app, 'mousedown', function (e) {
        var e = e || window.event,
          btnCode = e.button;
        if (btnCode === 0) {
          // 鼠标左键操作
          _self.handlerMousedownLeft.call(_self, e);
        } else if (btnCode === 2) {
          _self.handlerMousedownRight.call(_self, e);
        }
      });



      // 点击其他地方菜单消失
      addEvent(document, 'click', function (e) {
        var e = e || window.event;
        _self.menu.style.display = 'none';
      });
      // 取消鼠标右键默认事件
      addEvent(document, 'contextmenu', function (e) {
        var e = e || window.event;
        preventDefaultEvent(e);
      });
      // 取消冒泡
      addEvent(this.menu, 'click', function (e) {
        var e = e || window.event;
        cancelBuble(e);
      });
    },
    handlerMousedownLeft: function (e) {
      var _self = this;
      this.beginTime = new Date().getTime();
      this.menu.style.display = 'none';
      this.oPos = [parseInt(getStyles(this.app, 'left')), parseInt(getStyles(this.app, 'top'))];
      this.x = pagePos(e).X - this.oPos[0];
      this.y = pagePos(e).Y - this.oPos[1];

      addEvent(document, 'mousemove', mouseMove);
      addEvent(document, 'mouseup', mouseUp);

      cancelBuble(e);
      preventDefaultEvent(e);

      function mouseMove(e) {
        // 这里会去handlerMousedownLeft作用域里拿_self
        var e = e || window.event,
          elemLeft = pagePos(e).X - _self.x,
          elemTop = pagePos(e).Y - _self.y;

        if (elemLeft <= 0) {
          elemLeft = 0;
        } else if (elemLeft >= _self.screenWidth - _self.elemWidth) {
          elemLeft = _self.screenWidth - _self.elemWidth - 1;
        }

        if (elemTop <= 0) {
          elemTop = 0;
        } else if (elemTop >= _self.screenHeight - _self.elemHeight) {
          elemTop = _self.screenHeight - _self.elemHeight - 1;
        }
        _self.app.style.top = elemTop + 'px';
        _self.app.style.left = elemLeft + 'px';
      }

      function mouseUp() {
        _self.endTime = new Date().getTime();
        if (_self.clickEndTime - _self.clickBeginTime <= 100) {
          // 快速点击事件，不允许移动
          _self.app.style.left = _self.oPos[0];
          _self.app.style.top = _self.oPos[1];
          _self.counter++;
          if (_self.counter === 1) {
            _self.clickBeginTime = new Date().getTime();
          }

          if (_self.counter === 2) {
            _self.clickEndTime = new Date().getTime();
          }

          if (_self.clickBeginTime && _self.clickEndTime && (_self.clickEndTime - _self.clickBeginTime) < 200) {
            // 双击事件 => 执行fn
            _self.fn();
            _self.clickBeginTime = 0;
            _self.clickEndTime = 0;
            _self.counter = 0;
          }

          // 如果有人点了第一下然后过了一会儿再点，这个时候就不算是双击事件，所以要有一个延迟清除机制
          _self.timer = setTimeout(function () {
            _self.clickBeginTime = 0;
            _self.clickEndTime = 0;
            _self.counter = 0;
            clearTimeout(_self.timer);
          }, 500)

        }
        removeEvent(document, 'mousemove', mouseMove);
        removeEvent(document, 'mouseup', mouseUp);
      }
    },
    handlerMousedownRight: function (e) {
      var mLeft = pagePos(e).X,
        mTop = pagePos(e).Y;
      if (mLeft <= 0) {
        mLeft = 0;
      } else if (mLeft >= this.screenWidth - this.menuWidth) {
        mLeft = pagePos(e).X - this.menuWidth;
      }

      if (mTop <= 0) {
        mTop = 0;
      } else if (mTop >= this.screenHeight - this.menuHeight) {
        mTop = pagePos(e).Y - this.menuHeight;
      }
      // 菜单显示
      this.menu.style.display = 'block';
      this.menu.style.top = mTop + 'px';
      this.menu.style.left = mLeft + 'px';
    }
  }


  window.DragNclick = DragNclick;
})()