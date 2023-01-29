;
(function () {
  var JDMenu = function (opts) {
    // element
    this.menu = opts.menu;
    this.sub = opts.sub;
    this.menuItems = opts.menuItems;
    this.subItems = opts.subItems;

    // else
    this.menuLen = this.menuItems.length;
    this.subLen = this.subItems.length;
    this.mousePos = [];
    this.timer = null;
    this.isInSub = false;
    this.isFirst = true;
  }

  JDMenu.prototype = {
    init: function () {
      this.bindEvent();
    },
    bindEvent: function () {
      var _self = this;
      // menu-item绑定mouseenter
      this.handlerMenuItem();

      addEvent(this.menu, 'mouseenter', function () {
        // 判断当前鼠标位置
        addEvent(document, 'mousemove', mouseMove);
      });

      addEvent(this.menu, 'mouseleave', menuMouseOut);

      addEvent(this.sub, 'mouseenter', function () {
        _self.isInSub = true;
      });

      addEvent(this.sub, 'mouseleave', function () {
        _self.isInSub = false;
      });

      function mouseMove(e) {
        var e = e || window.event;
        _self.mousePos.push({
          x: pagePos(e).X,
          y: pagePos(e).Y
        });
        if (_self.mousePos.length >= 3) {
          _self.mousePos.shift();
        }
      }

      function menuMouseOut() {
        _self.sub.className += ' hide';
        _self.isFirst = true;
        _self.removeAllActive();
        removeEvent(document, 'mousemove', mouseMove);
      }
    },
    handlerMenuItem: function () {
      for (var i = 0; i < this.menuLen; i++) {
        var menuItem = this.menuItems[i];
        addEvent(menuItem, 'mouseenter', this.menuItemMouseEnter.bind(this));
      }
    },
    menuItemMouseEnter: function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement,
        curPos = this.mousePos[1] || {
          x: 0,
          y: 0
        },
        lastPos = this.mousePos[0] || {
          x: 0,
          y: 0
        },
        toDelay = this.doTimeout(curPos, lastPos),
        _self = this,
        curIdx = Array.prototype.indexOf.call(this.menuItems, tar);
      this.timer && clearTimeout(this.timer);
      if (!this.isFirst) {
        if (toDelay) {
          this.timer = setTimeout(function () {
            if (_self.isInSub) {
              return;
            } else {
              _self.addActive(curIdx);
            }
          }, 300)
        } else {
          this.addActive(curIdx);
        }
      } else {
        this.addActive(curIdx);
        this.isFirst = false;
      }

    },
    addActive: function (index) {
      this.removeAllActive();
      this.sub.className = 'sub';
      this.menuItems[index].className += ' active';
      this.subItems[index].className += ' active';
    },
    removeAllActive: function () {
      for (var i = 0; i < this.menuLen; i++) {
        var menuItem = this.menuItems[i],
          subItem = this.subItems[i];
        menuItem.className = 'menu-item';
        subItem.className = 'sub-item'
      }
    },
    doTimeout: function (curPos, lastPos) {
      var topLeft = {
          x: parseInt(getStyles(this.menu, 'width')) + parseInt(getStyles(this.menu, 'margin-left')),
          y: parseInt(getStyles(this.menu, 'margin-top'))
        },
        bottomLeft = {
          x: parseInt(getStyles(this.menu, 'width')) + parseInt(getStyles(this.menu, 'margin-left')),
          y: parseInt(getStyles(this.menu, 'height')) + parseInt(getStyles(this.menu, 'margin-top'))
        };
      return pointInTriangle(curPos, lastPos, topLeft, bottomLeft);
    }
  }

  window.JDMenu = JDMenu;
})();