(function(doc, win) {
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function() {
        var clientWidth = docEl.clientWidth;
        var clientHeight = docEl.clientHeight;
        if (!clientWidth) return;
        docEl.style.fontSize = 20 * Math.sqrt(Math.pow(clientHeight / 480) + Math.pow(clientWidth / 320)) + 'px';
      };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document, window);
  