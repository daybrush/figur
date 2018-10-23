/*
Copyright (c) 2018 Daybrush
license: MIT
author: Daybrush
repository: https://github.com/daybrush/shape-svg
@version 0.0.1
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  return t;
}

var CLASS_NAME = "__shape-svg";

function makeDOM(tag) {
  return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

function makeSVGDOM() {
  var el = makeDOM("svg");
  el.setAttribute("class", CLASS_NAME);
  return el;
}

function getRect(_a) {
  var _b = _a.side,
      side = _b === void 0 ? 3 : _b,
      _c = _a.rotate,
      rotate = _c === void 0 ? 0 : _c,
      _d = _a.innerRadius,
      innerRadius = _d === void 0 ? 100 : _d,
      _e = _a.width,
      width = _e === void 0 ? 0 : _e,
      _f = _a.height,
      height = _f === void 0 ? 0 : _f,
      _g = _a.strokeLinejoin,
      strokeLinejoin = _g === void 0 ? "round" : _g,
      _h = _a.strokeWidth,
      strokeWidth = _h === void 0 ? 0 : _h;
  var xPoints = [];
  var yPoints = [];
  var sideCos = Math.cos(Math.PI / side);
  var startRad = Math.PI / 180 * rotate + Math.PI * ((side % 2 ? 0 : 1 / side) - 1 / 2);

  for (var i = 0; i < side; ++i) {
    var rad = Math.PI * (1 / side * 2 * i) + startRad;
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    xPoints.push(cos);
    yPoints.push(sin);

    if (innerRadius !== 100) {
      if (sideCos <= innerRadius / 100) {
        continue;
      } else {
        xPoints.push(innerRadius / 100 * Math.cos(rad + Math.PI / side));
        yPoints.push(innerRadius / 100 * Math.sin(rad + Math.PI / side));
      }
    }
  }

  var minX = Math.min.apply(Math, xPoints);
  var minY = Math.min.apply(Math, yPoints);
  var maxX = Math.max.apply(Math, xPoints);
  var maxY = Math.max.apply(Math, yPoints);
  var isWidth = !!width;
  var scale = isWidth ? width / (maxX - minX) : height / (maxY - minY);
  var isOuter = strokeLinejoin === "miter" || strokeLinejoin === "arcs" || strokeLinejoin === "miter-clip";
  var outerScale = isOuter ? (scale + strokeWidth / 2) / scale : 1;
  var pos = isOuter ? 0 : strokeWidth / 2;
  xPoints = xPoints.map(function (xp) {
    return (xp - minX * outerScale) * scale + pos;
  });
  yPoints = yPoints.map(function (yp) {
    return (yp - minY * outerScale) * scale + pos;
  });
  var polygonWidth = (maxX - minX) * outerScale * scale + pos * 2;
  var polygonHeight = (maxY - minY) * outerScale * scale + pos * 2;
  var points = xPoints.map(function (xp, i) {
    return [xp, yPoints[i]];
  });
  return {
    points: points,
    width: polygonWidth,
    height: polygonHeight
  };
}
function star(_a, container) {
  var _b = _a.side,
      side = _b === void 0 ? 3 : _b,
      _c = _a.innerRadius,
      innerRadius = _c === void 0 ? 60 * Math.cos(Math.PI / side) : _c;
  return poly(__assign({}, arguments[0], {
    innerRadius: innerRadius
  }), container);
}
function poly(_a, container) {
  if (container === void 0) {
    container = makeSVGDOM();
  }

  var _b = _a.left,
      left = _b === void 0 ? 0 : _b,
      _c = _a.top,
      top = _c === void 0 ? 0 : _c,
      _d = _a.right,
      right = _d === void 0 ? 0 : _d,
      _e = _a.bottom,
      bottom = _e === void 0 ? 0 : _e,
      strokeWidth = _a.strokeWidth,
      _f = _a.strokeLinejoin,
      strokeLinejoin = _f === void 0 ? "round" : _f,
      _g = _a.fill,
      fill = _g === void 0 ? "transparent" : _g,
      side = _a.side,
      width = _a.width,
      height = _a.height,
      rotate = _a.rotate,
      _h = _a.innerRadius,
      innerRadius = _h === void 0 ? 100 : _h,
      attributes = __rest(_a, ["left", "top", "right", "bottom", "strokeWidth", "strokeLinejoin", "fill", "side", "width", "height", "rotate", "innerRadius"]);

  var _j = getRect({
    side: side,
    rotate: rotate,
    width: width,
    height: height,
    innerRadius: innerRadius,
    strokeLinejoin: strokeLinejoin,
    strokeWidth: strokeWidth
  }),
      points = _j.points,
      polygonWidth = _j.width,
      polygonHeight = _j.height;

  var polygon = makeDOM("polygon");

  if (container.getAttribute("class") === CLASS_NAME) {
    container.setAttribute("viewBox", "0 0 " + (left + polygonWidth + right) + " " + (top + polygonHeight + bottom));
  }

  polygon.setAttribute("fill", fill);
  polygon.setAttribute("stroke-linejoin", strokeLinejoin);
  polygon.setAttribute("stroke-width", "" + strokeWidth);
  polygon.setAttribute("points", points.map(function (point) {
    return left + point[0] + "," + (top + point[1]);
  }).join(" "));

  for (var name in attributes) {
    polygon.setAttribute(name, attributes[name]);
  }

  container.appendChild(polygon);
  return container;
}
var VERSION = "0.0.1";

exports.getRect = getRect;
exports.star = star;
exports.poly = poly;
exports.VERSION = VERSION;
//# sourceMappingURL=shapesvg.common.js.map
