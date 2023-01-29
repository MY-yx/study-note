// window.onload 一般不会用
function init() {
  // 整合模块 => 最后所有人写的模块统一放到这里可控制
  initTodoList;
}
var initTodoList = (function () {
  var showInput = document.getElementsByClassName('j-show-input')[0],
    inputWrap = document.getElementsByClassName('input-wrap')[0],
    addItem = document.getElementsByClassName('j-add-item')[0],
    textInput = document.getElementById('textInput'), // input可以用id
    oList = document.getElementsByClassName('j-list')[0],
    inputShow = false,
    isEdit = false,
    curIdx = null;

  addEvent(oList, 'click', handlerOlistClick);
  addEvent(showInput, 'click', handlerShowInput);
  addEvent(addItem, 'click', handlerAddItem);

  // 点击显示或隐藏
  function handlerShowInput() {
    if (inputShow) {
      inputWrap.style.display = 'none';
      inputShow = false;


    } else {
      inputWrap.style.display = 'block';
      inputShow = true;
    }
  }

  // 增加li
  function handlerAddItem() {
    var val = textInput.value,
      len = val.length,
      oItems = document.getElementsByClassName('item'),
      itemLen = oItems.length,
      item;

    if (len === 0) {
      return;
    }
    // 去重
    for (var i = 0; i < itemLen; i++) {
      item = elemChildren(oItems[i])[0];
      var text = item.innerText
      if (text === val) {
        alert('此项目已存在');
        return
      }
    }

    if (isEdit) {
      var itemContent = elemChildren(oItems[curIdx])[0];
      itemContent.innerText = val;
      resetState();
    } else {
      var oLi = document.createElement('li');
      oLi.className = 'item';
      oLi.innerHTML = itemTpl(val);
      oList.appendChild(oLi);
    }
    // 配置完清空
    textInput.value = '';
    inputWrap.style.display = 'none';
    inputShow = false;
    curIdx = null;
    isEdit = false;
  }

  function handlerOlistClick(e) {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      liParent = elemParent(tar, 2),
      oItems = document.getElementsByClassName('item'),
      tarInx = Array.prototype.indexOf.call(oItems, liParent);
    if (tar.className.indexOf('edit-btn') !== -1) {
      var itemLen = oItems.length,
        item;
      // 点击时需要展示出input
      inputWrap.style.display = 'block';
      inputShow = true;
      // 其他li去除背景颜色
      for (var i = 0; i < itemLen; i++) {
        item = oItems[i];
        item.className = 'item';
      }
      curIdx = tarInx;
      isEdit = true;
      liParent.className += ' active';
      addItem.innerText = '编辑第' + (tarInx + 1) + '项';
    } else if (tar.className.indexOf('remove-btn') !== -1) {
      liParent.remove();
      resetState();
    }
  }

  function resetState() {
    curIdx = null;
    isEdit = false;
    inputWrap.value = '';
    addItem.innerText = '配置项目'
  }

  // 另一种替换模板的方法 方法很好但写的太复杂了
  function itemTpl(text) {
    return (
      '<p class="item-context">' + text + '</p>' +
      '<div class="btn-group">' +
      '<a href="javascript:;" class="edit-btn fa fa-edit"></a>' +
      '<a href="javascript:;" class="remove-btn fa fa-times"></a>' +
      '</div>'
    )
  }
})();