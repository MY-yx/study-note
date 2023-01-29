window.onload = function () {
  init();
}

function init() {
  initMagnifier();
}

var initMagnifier = (function () {
  var oImgWrap = document.getElementsByClassName('img-wrap')[0],
    oMagWrap = oImgWrap.getElementsByClassName('mag-wrap')[0],
    oMagImg = oImgWrap.getElementsByClassName('mag-img')[0],
    magWidth = parseInt(getStyles(oMagWrap, 'width')),
    magHeight = parseInt(getStyles(oMagWrap, 'height')),
    imgX = oImgWrap.offsetLeft,
    imgY = oImgWrap.offsetTop;

  addEvent(oImgWrap, 'mouseover', function (e) {
    var pos = getXY(e);
    changePos(pos.x, pos.y);
    oMagWrap.className += ' show';
    addEvent(document, 'mousemove', mouseMove);
  });

  addEvent(oImgWrap, 'mouseout', mouseOut);

  function getXY(e) {
    var e = e || window.event;
    return {
      x: pagePos(e).X - magWidth / 2 - imgX,
      y: pagePos(e).Y - magHeight / 2 - imgY,
      mouseX: pagePos(e).X - imgX,
      mouseY: pagePos(e).Y - imgY,
    }
  }

  function changePos(x, y, mouseX, mouseY) {
    oMagWrap.style.top = y + 'px';
    oMagWrap.style.left = x + 'px';
    oMagImg.style.top = -y + 'px';
    oMagImg.style.left = -x + 'px';
    if (mouseX && mouseY) {
      if (mouseX < 0 || mouseX > parseInt(getStyles(oImgWrap, 'width')) || mouseY < 0 || mouseY > parseInt(getStyles(oImgWrap, 'height'))) {
        oMagWrap.className = 'mag-wrap';
      }
    }
  }

  function mouseMove(e) {
    var pos = getXY(e);
    changePos(pos.x, pos.y, pos.mouseX, pos.mouseY);
  }

  function mouseOut() {
    oMagWrap.className = 'mag-wrap';
    removeEvent(document, 'mousemove', mouseMove);
  }
});