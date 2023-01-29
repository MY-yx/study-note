;
(function (node) {
  var TodoList = function () {
    var _self = this;
    this.node = node;
    this.inputShow = false;
    this.isEdit = false;
    this.curIdx = null;

    this.defaultConfig = {
      "plusBtn": "",
      "inputArea": "",
      "addBtn": "",
      "list": "",
      "itemClass": ""
    }
    this.config = this.getConfig();
    for (var key in this.defaultConfig) {
      if (!this.config.hasOwnProperty(key)) {
        // 可以在报错信息里补充详细的配置
        throw new Error('缺少配置项' + key + ', 请检查您的传参');
      }
    }
    this.setConfig();

    addEvent(this.plusBtn, 'click', function () {
      _self.showInput.call(_self);
    });

    addEvent(this.addBtn, 'click', function () {
      _self.addBtnClick.call(_self)
    });

    addEvent(this.oList, 'click', function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement;
      _self.listClickBtn.call(_self, tar);
    });
  }

  TodoList.prototype = {
    getConfig: function () {
      // 获取data-*格式的数据 => 但要注意返回的是个字符串
      return JSON.parse(this.node.getAttribute('data-config'));
    },
    setConfig: function () {
      var config = this.config,
        node = this.node; // 缓存

      this.inputArea = node.getElementsByClassName(config.inputArea)[0];
      this.addBtn = this.inputArea.getElementsByClassName(config.addBtn)[0];
      this.content = this.inputArea.getElementsByClassName(config.content)[0];
      this.plusBtn = node.getElementsByClassName(config.plusBtn)[0];
      this.oList = node.getElementsByClassName(config.list)[0];
      this.itemClass = config.itemClass;
    },
    showInput: function () {
      this.inputShow ? setInputShow.call(this, 'close') : setInputShow.call(this, 'open')
    },
    addBtnClick: function () {
      var content = this.content.value,
        contentLen = content.length,
        oItems = this.oList.getElementsByClassName(this.itemClass),
        itemLen = oItems.length,
        text;
      if (contentLen <= 0) {
        return;
      }
      if (itemLen > 0) {
        for (var i = 0; i < itemLen; i++) {
          text = elemChildren(oItems[i])[0].innerText;
          if (text === content) {
            alert('已存在改项');
            return;
          }
        }
      }
      if (this.isEdit) {
        elemChildren(oItems[this.curIdx])[0].innerText = content;
        setInputStatus.apply(this, [oItems, null, 'add']);
      } else {
        var oLi = document.createElement('li');
        oLi.className = this.itemClass;
        oLi.innerHTML = itemTpl(content);
        this.oList.appendChild(oLi);
      }
      setInputShow.call(this, 'close');
    },
    listClickBtn: function (tar) {
      var className = tar.className,
        oParent = elemParent(tar, 2),
        oItems = this.oList.getElementsByClassName(this.itemClass),
        itemLen = oItems.length,
        item;
      if (className === 'edit-btn fa fa-edit') {
        for (var i = 0; i < itemLen; i++) {
          item = oItems[i];
          item.className = 'item';
        }
        oParent.className += ' active';
        setInputShow.call(this, 'open');
        setInputStatus.call(this, oItems, oParent, 'edit');
      } else if (className === 'remove-btn fa fa-times') {
        oParent.remove();
      }
    }
  }
  function setInputShow(action) {
    var oItems = this.oList.getElementsByClassName('item');
    if (action === 'open') {
      this.inputArea.style.display = 'block';
      this.inputShow = true;
    } else if (action === 'close') {
      this.inputArea.style.display = 'none';
      this.inputShow = false;
      this.content.value = '';
      setInputStatus.apply(this, [oItems, null, 'add']);
    }
  }
  function setInputStatus(oItems, target, status) {
    if (status === 'edit') {
      var idx = Array.prototype.indexOf.call(oItems, target),
        text = elemChildren(target)[0].innerText;
      this.curIdx = idx;
      this.isEdit = true;
      this.addBtn.innerText = '编辑第' + (idx + 1) + '项';
      this.content.value = text;
    } else if (status === 'add') {
      var itemLen = oItems.length,
        item;
      for (var i = 0; i < itemLen; i++) {
        item = oItems[i];
        this.addBtn.innerText = '配置项目';
        this.isEdit = false;
        this.curIdx = null;
      }
    }
  }
  function itemTpl(text) {
    return (
      '<p class="item-context">' + text + '</p>' +
      '<div class="btn-group">' +
      '<a href="javascript:;" class="edit-btn fa fa-edit"></a>' +
      '<a href="javascript:;" class="remove-btn fa fa-times"></a>' +
      '</div>'
    )
  }

  new TodoList();
})(document.getElementsByClassName('todo-wrap')[0])