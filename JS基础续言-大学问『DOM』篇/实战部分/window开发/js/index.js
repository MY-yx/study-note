Element.prototype.dragNclick = (function (menu, fn) {
  var screenWidth = getViewportSize().width,
    screenHeight = getViewportSize().height,
    elemWidth = parseInt(getStyles(this, 'width')),
    elemHeight = parseInt(getStyles(this, 'height')),
    menuWidth = parseInt(getStyles(menu, 'width')),
    menuHeight = parseInt(getStyles(menu, 'height')),
    beginTime = 0, // mousedown更新时间
    endTime = 0,
    clickBeginTime = 0, // 点击时间
    clickEndTime = 0,
    counter = 0, // 点击次数计数器
    oPos = null,
    timer = null;

  drag.call(this)

  function drag() {
    // 三个事件 mousedown mousemove mouseup
    var x,
      y,
      _self = this;

    addEvent(this, 'mousedown', function (e) {
      var e = e || window.event,
        btnCode = e.button;
      if (btnCode === 2) {
        // 鼠标右键操作 
        var mLeft = pagePos(e).X,
          mTop = pagePos(e).Y;
        // 这里的边界判断 => xy轴最大的移动距离 = 可视宽高 - menu自身的宽高
        // menu的top和left值需要根据当前鼠标e的x和y减去对应menu的width和height
        if (mLeft <= 0) {
          mLeft = 0;
        } else if (mLeft >= screenWidth - menuWidth) {
          mLeft = pagePos(e).X - menuWidth;
        }

        if (mTop <= 0) {
          mTop = 0;
        } else if (mTop >= screenHeight - menuHeight) {
          mTop = pagePos(e).Y - menuHeight;
        }
        // 菜单显示
        menu.style.display = 'block';
        menu.style.top = mTop + 'px';
        menu.style.left = mLeft + 'px';
      } else if (btnCode === 0) {
        // 鼠标左键操作
        menu.style.display = 'none';
        beginTime = new Date().getTime();
        oPos = [parseInt(getStyles(this, 'left')), parseInt(getStyles(this, 'top'))];
        x = pagePos(e).X - oPos[0]; // 记录初次点击时鼠标x, y的位置
        y = pagePos(e).Y - oPos[1];

        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        cancelBuble(e);
        preventDefaultEvent(e);
      }
    });

    // 阻止鼠标右键默认事件
    addEvent(document, 'contextmenu', function (e) {
      var e = e || window.event;
      preventDefaultEvent(e);
    });

    // 点击其他地方菜单消失
    addEvent(document, 'click', function (e) {
      menu.style.display = 'none';
    });

    // 点击菜单本身不能消失 => 取消菜单冒泡行为
    addEvent(menu, 'click', function (e) {
      var e = e || window.event;
      cancelBuble(e);
    });

    function mouseMove(e) {
      var e = e || window.event,
        elemLeft = pagePos(e).X - x,
        elemTop = pagePos(e).Y - y;

      if (elemLeft <= 0) {
        elemLeft = 0;
      } else if (elemLeft >= screenWidth - elemWidth) {
        elemLeft = screenWidth - elemWidth - 1;
      }

      if (elemTop <= 0) {
        elemTop = 0;
      } else if (elemTop >= screenHeight - elemHeight) {
        elemTop = screenHeight - elemHeight - 1;
      }
      _self.style.top = elemTop + 'px';
      _self.style.left = elemLeft + 'px';
    }

    function mouseUp(e) {
      endTime = new Date().getTime();
      if (clickEndTime - clickBeginTime <= 100) {
        // 快速点击事件，不允许移动
        _self.style.left = oPos[0];
        _self.style.top = oPos[1];
        counter++;
        if (counter === 1) {
          clickBeginTime = new Date().getTime();
        }

        if (counter === 2) {
          clickEndTime = new Date().getTime();
        }

        if (clickBeginTime && clickEndTime && (clickEndTime - clickBeginTime) < 200) {
          // 双击事件 => 执行fn
          fn();
          clickBeginTime = 0;
          clickEndTime = 0;
          counter = 0;
        }

        // 如果有人点了第一下然后过了一会儿再点，这个时候就不算是双击事件，所以要有一个延迟清除机制
        timer = setTimeout(function () {
          clickBeginTime = 0;
          clickEndTime = 0;
          counter = 0;
          clearTimeout(timer);
        }, 500)

      }

      removeEvent(document, 'mousemove', mouseMove);
      removeEvent(document, 'mouseup', mouseUp);
    }
  }
})