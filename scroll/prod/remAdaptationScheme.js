'use strict';
/**
 * @param {Boolean} [normal = false] - 默认开启页面压缩以使页面高清;  
 * @param {Number} [baseFontSize = 100] - 基础fontSize, 默认100px;
 * @param {Number} [fontscale = 1] - 有的业务希望能放大一定比例的字体;
 */

var win = window;

win.flex = function (normal, baseFontSize, fontscale) {
  var _baseFontSize = baseFontSize || 100;

  var _fontscale = fontscale || 1;

  var doc = win.document;
  var ua = navigator.userAgent;
  var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
  var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
  var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  var dpr = win.devicePixelRatio || 1;

  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    dpr = 1;
  }

  var scale = normal ? 1 : 1 / dpr;
  var metaEl = doc.querySelector('meta[name="viewport"]');

  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
  }

  metaEl.setAttribute('content', "width=device-width,user-scalable=no,initial-scale=".concat(scale, ",maximum-scale=").concat(scale, ",minimum-scale=").concat(scale));
  doc.documentElement.style.fontSize = normal ? '50px' : "".concat(_baseFontSize / 2 * dpr * _fontscale, "px");
};

win.flex(false, 100, 1);