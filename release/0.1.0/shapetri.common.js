/*
Copyright (c) 2018 Daybrush
license: MIT
author: Daybrush
repository: https://github.com/daybrush/shape-tri
@version 0.1.0
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _a;

var TOP = "top";
var BOTTOM = "bottom";
var LEFT = "left";
var RIGHT = "right";
var REVERSE = (_a = {}, _a[TOP] = BOTTOM, _a[BOTTOM] = TOP, _a[LEFT] = RIGHT, _a[RIGHT] = LEFT, _a);
var TRI_CLASS = "__shape-tri-";
var SIDE_CLASS = TRI_CLASS + "side";
var POSITION_ABSOLUTE = "position:absolute;";

function splitUnit(text) {
  var matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);

  if (!matches) {
    return {
      unit: "",
      value: NaN
    };
  }

  var value = matches[2];
  var unit = matches[3];
  return {
    unit: unit,
    value: parseFloat(value)
  };
}

function getSideCSS(strokeWidth, isVertical) {
  var x = isVertical ? strokeWidth : "50%";
  var y = isVertical ? "50%" : strokeWidth;
  return POSITION_ABSOLUTE + "width:100%;height:100%;border-radius:inherit;background-color:inherit;" + ("transform-origin:" + x + " " + y + ";");
}

function makeDOM(tag, className) {
  var el = document.createElement(tag);
  el.className = className;
  return el;
}

function dom(el) {
  var strokeWidth = el.getAttribute("data-stroke-width") || undefined;
  var stroke = el.getAttribute("data-stroke") || undefined;
  var direction = el.getAttribute("data-direction") || undefined;
  var fill = el.getAttribute("data-fill") || undefined;
  return tri({
    strokeWidth: strokeWidth,
    stroke: stroke,
    direction: direction,
    fill: fill,
    container: el
  });
}
function tri(_a) {
  var _b = _a.className,
      className = _b === void 0 ? TRI_CLASS + "triangle" : _b,
      _c = _a.strokeWidth,
      strokeWidth = _c === void 0 ? 0 : _c,
      _d = _a.stroke,
      stroke = _d === void 0 ? "black" : _d,
      _e = _a.fill,
      _f = _a.direction,
      direction = _f === void 0 ? BOTTOM : _f,
      _g = _a.container,
      container = _g === void 0 ? makeDOM("div", className) : _g;

  var _h = splitUnit("" + strokeWidth),
      strokeUnit = _h.unit,
      strokeValue = _h.value;

  var half = "" + strokeValue / 2 + strokeUnit;
  var isVertical = direction === TOP || direction === BOTTOM;
  var sideCSS = getSideCSS(half, isVertical);
  var directionProperty = isVertical ? LEFT : TOP;
  var sign = direction === TOP || direction === RIGHT ? -1 : 1;
  var width = isVertical ? "100%" : strokeWidth;
  var height = isVertical ? strokeWidth : "100%"; // (50% - strokeWidth / 2) * r3 + strokeWidth

  var padding = isVertical ? "calc(50% * 1.7321 + " + strokeWidth + " * 0.132)" : // (100% - strokeWidth) / r3 * 2 + strokeWidth
  "calc(200% / 1.7321 - " + strokeWidth + " * 1.154 + " + strokeWidth + ")";
  var reverseDirection = REVERSE[direction];
  var sideHTML = "<div class=\"" + SIDE_CLASS + "1\" style=\"" + POSITION_ABSOLUTE + reverseDirection + ": 0;\n  " + directionProperty + ":0;display:inline-block;width:" + width + ";height:" + height + ";border-radius:" + half + ";\n  background:" + stroke + ";\"><div class=\"" + SIDE_CLASS + "2\"\n  style=\"" + sideCSS + "transform:rotate(" + sign * 60 + "deg);\"></div><div class=\"" + SIDE_CLASS + "3\"\n  style=\"" + sideCSS + directionProperty + ":100%;\n  margin-" + directionProperty + ":-" + strokeWidth + ";\n  transform:rotate(" + sign * 120 + "deg)\"></div></div><div class=\"" + TRI_CLASS + "percent\" style=\"position:relative;\n  width:100%;padding-top:" + padding + ";\"\n  ></div>";

  if (getComputedStyle(container).position === "static") {
    container.style.position = "relative";
  }

  container.insertAdjacentHTML("beforeend", sideHTML);
  return container;
}
var VERSION = "0.1.0";

exports.dom = dom;
exports.tri = tri;
exports.VERSION = VERSION;
//# sourceMappingURL=shapetri.common.js.map
