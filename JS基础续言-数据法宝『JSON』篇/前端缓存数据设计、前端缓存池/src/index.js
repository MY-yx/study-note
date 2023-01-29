window.onload = function () {
  init();
}

function init() {
  initCourseList();
}

var initCourseList = (function () {
  var oBtnGroup = document.getElementsByClassName('btn-group')[0],
    oBtnItem = document.getElementsByClassName('btn-item'),
    oList = document.getElementsByClassName('js-list')[0],
    oTpl = document.getElementById('J_template').innerHTML,
    oLoading = document.getElementsByClassName('loading')[0],
    page = 0,
    timer = null,
    cache = {};

  function init() {
    bindEvent();
    getAjaxCourse();
  }

  function bindEvent() {
    addEvent(oBtnGroup, 'click', btnClick)
  }

  function btnClick(e) {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      oParent = tar.parentNode,
      className = oParent.className,
      curIdx = Array.prototype.indexOf.call(oBtnItem, oParent);

    if (className === 'btn-item') {
      // 点击的是a标签
      var itemLen = oBtnItem.length,
        item;
      page = curIdx;
      // 这里重新点击之前点过得页会造成重复请求; 不再发额外的http请求
      if (cache[page]) {
        render(cache[page])
      } else {
        getAjaxCourse();
      }

      for (var i = 0; i < itemLen; i++) {
        item = oBtnItem[i];
        item.className = 'btn-item';
      }
      oBtnItem[curIdx].className += ' cur';
    }
  }

  function getAjaxCourse() {
    ajaxReturn({
      url: APIs.getCourses,
      type: 'POST',
      data: {
        page: page
      },
      success: function (data) {
        // 如果请求成功响应则将data存入缓存池; 也可以设置一个计时器，定时给缓存器情况
        cache[page] = data;

        oLoading.style.display = 'block';
        timer = setTimeout(function () {
          render(data);
          oLoading.style.display = 'none';
        }, 500)
      },
      error: function () {
        alert('获取数据失败')
      }
    })
  }

  function render(data) {
    var list = '',
      len = data.length,
      item;
    for (var i = 0; i < len; i++) {
      item = data[i];
      list += setTplToHTML(oTpl, regTpl, {
        folder: item.folder,
        classname: item.classname,
        name: item.name,
        watched: item.watched
      });
    }
    oList.innerHTML = list;
  }


  return function () {
    init();
  }

})();

var APIs = {
  getCourses: 'http://study.jsplusplus.com/Lfcourses/getCourses'
}


function ajaxReturn(opt) {
  $.ajax({
    url: opt.url,
    type: opt.type,
    dataType: 'JSON',
    data: opt.data,
    timeout: 10000,
    success: opt.success,
    error: opt.error
  })
}
