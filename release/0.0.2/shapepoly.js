/*
Copyright (c) 2018 Daybrush
license: MIT
author: Daybrush
repository: https://github.com/daybrush/shape-tri
@version 0.0.2
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.ShapePoly = factory());
}(this, (function () { 'use strict';

  var _a;

  var TOP = "top";
  var BOTTOM = "bottom";
  var LEFT = "left";
  var RIGHT = "right";
  var REVERSE = (_a = {}, _a[TOP] = BOTTOM, _a[BOTTOM] = TOP, _a[LEFT] = RIGHT, _a[RIGHT] = LEFT, _a);
  var POLY_CLASS = "__shape-poly";
  var SIDE_CLASS = POLY_CLASS + "-side";
  var POSITION_ABSOLUTE = "position:absolute;";
  var SIDE_CSS = POSITION_ABSOLUTE + "width:100%;height:100%;border-radius:inherit;\nbackground-color:inherit;transform-origin:inherit;";

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

  function getTransformOrigin(strokeWidth, isVertical) {
    var x = isVertical ? strokeWidth : "50%";
    var y = isVertical ? "50%" : strokeWidth;
    return "transform-origin:" + x + " " + y + ";";
  }

  function getHTML(no, style, content) {
    if (content === void 0) {
      content = "";
    }

    return "<div class=\"" + SIDE_CLASS + no + "\" style=\"" + style + "\">" + content + "</div>";
  }

  function makeDOM(tag, className) {
    var el = document.createElement(tag);
    el.className = className;
    return el;
  }

  function getSin(side) {
    // sin([n / 2] * 180 / n)
    return Math.sin(Math.floor(side / 2) * Math.PI / side);
  }

  function getCos(side) {
    // cos(180 / n)
    return Math.cos(Math.PI / side);
  }

  function getStarAngle(side, radius) {
    var cos = getCos(side);
    return 100 * cos <= radius ? 0 : Math.atan((cos - radius / 100) / Math.sin(Math.PI / side)) / Math.PI * 180;
  }

  function getSideSize(side, split, starAngle, strokeWidth) {
    var starRatio = starAngle ? 1 / Math.cos(starAngle * Math.PI / 180) : 1;
    var ratio = 1 / split;

    if (side > 4) {
      var sin = Math.sin(Math.PI / side);
      var cos = Math.cos(Math.PI / side);

      if (side % 4 === 0) {
        // 2 * r * cos(180 / n) = w
        // 2 * r * sin(180 / n) = size
        ratio *= sin / cos;
      } else if (side % 2 === 0) {
        ratio *= sin;
      } else {
        // 2 * r * sin([n /2] * 180 / n) = w
        // 2 * r * sin(180 / n) = size
        ratio *= sin / getSin(side);
      }
    } else if (split === 1) {
      return "100%";
    }

    ratio *= starRatio;
    return "calc(100% * " + ratio + " - " + strokeWidth + " * " + ratio + " + " + strokeWidth + ")";
  }

  function getHeight(side, strokeWidth, isVertical) {
    if (side % 4 === 0) {
      return "100%";
    }

    var cos = getCos(side);
    var ratio = 0;

    if (side % 2 === 0) {
      // w * cos = h (vertical)
      // w / cos = h (horizontal)
      ratio = isVertical ? cos : 1 / cos;
    } else {
      var sin = getSin(side);

      if (isVertical) {
        // 2 * r * sin([n /2] * 180 / n) = w
        ratio = 0.5 / sin * (1 + cos);
      } else {
        // r * (1 + cos(180 / n)) = w
        ratio = 2 * 1 / (1 + cos) * sin;
      }
    }

    return "calc(100% * " + ratio + " + " + strokeWidth + " * " + (1 - ratio) + ")";
  }

  function getFirstTransform(side, split, isVertical, starAngle, strokeValue, strokeUnit) {
    var translateProperty = isVertical ? "X" : "Y";
    var cos = Math.cos(starAngle * Math.PI / 180);
    var arr = [];

    if (side >= 4) {
      arr.push("translate" + translateProperty + "(-" + 50 * cos * split + "%)");

      if (split > 1) {
        arr.push("translate" + translateProperty + "(" + strokeValue / 2 * (cos * split - 1) + strokeUnit + ")");
      }
    }

    if (starAngle !== 0) {
      arr.push("rotate(" + starAngle + "deg)");
    }

    return arr.length > 0 ? "transform:" + arr.join(" ") + ";" : "";
  }

  function dom(el) {
    var strokeWidth = el.getAttribute("data-stroke-width") || undefined;
    var stroke = el.getAttribute("data-stroke") || undefined;
    var direction = el.getAttribute("data-direction") || undefined;
    return poly({
      strokeWidth: strokeWidth,
      stroke: stroke,
      direction: direction,
      container: el
    });
  }
  function poly(_a) {
    var _b = _a.className,
        className = _b === void 0 ? POLY_CLASS : _b,
        _c = _a.strokeWidth,
        strokeWidth = _c === void 0 ? 0 : _c,
        _d = _a.side,
        side = _d === void 0 ? 3 : _d,
        _e = _a.split,
        split = _e === void 0 ? 1 : _e,
        _f = _a.starRadius,
        starRadius = _f === void 0 ? 100 : _f,
        _g = _a.stroke,
        stroke = _g === void 0 ? "black" : _g,
        _h = _a.direction,
        direction = _h === void 0 ? BOTTOM : _h,
        _j = _a.container,
        container = _j === void 0 ? makeDOM("div", className) : _j;
    var splitCount = split * (starRadius === 100 ? 1 : 2);

    var _k = splitUnit("" + strokeWidth),
        strokeUnit = _k.unit,
        strokeValue = _k.value;

    var half = "" + strokeValue / 2 + strokeUnit;
    var reverseDirection = REVERSE[direction];
    var isVertical = direction === TOP || direction === BOTTOM;
    var directionProperty = isVertical ? LEFT : TOP;
    var padding = getHeight(side, strokeWidth, isVertical);
    var sign = direction === TOP || direction === RIGHT ? -1 : 1;
    var starAngle = starRadius === 100 ? 0 : getStarAngle(side, starRadius);
    var sideWidth = getSideSize(side, splitCount, starAngle, strokeWidth);
    var width = isVertical ? sideWidth : strokeWidth;
    var height = isVertical ? strokeWidth : sideWidth;
    var externalAngle = 360 / side + 2 * starAngle;
    var html;

    for (var i = side - 1; i >= 0; --i) {
      for (var j = splitCount - 1; j >= 0; --j) {
        var no = i * splitCount + j;

        if (no === 0) {
          continue;
        }

        var transform = j === 0 ? "transform:rotate(" + sign * externalAngle + "deg)" : starAngle && j === splitCount / 2 ? "transform:rotate(" + -sign * 2 * starAngle + "deg)" : "";
        html = getHTML(no, SIDE_CSS + (directionProperty + ":100%;\n      margin-" + directionProperty + ":-" + strokeWidth + ";" + transform), html);
      }
    }

    var pos = side < 4 ? "0" : "50%";
    var transformSplit = getFirstTransform(side, splitCount, isVertical, sign * starAngle, strokeValue, strokeUnit);
    var sideHTML = getHTML(0, "" + POSITION_ABSOLUTE + reverseDirection + ": 0;\n  " + directionProperty + ":" + pos + ";" + transformSplit + getTransformOrigin(half, isVertical) + "\n  display:inline-block;width:" + width + ";height:" + height + ";border-radius:" + half + ";\n  background:" + stroke + ";", html);
    var percentHTML = getHTML("percent", "position:relative;width:100%;padding-top:" + padding);

    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }

    container.insertAdjacentHTML("beforeend", sideHTML + percentHTML);
    return container;
  }
  function be(container, _a) {
    var _b = _a.strokeWidth,
        _c = _a.side,
        _d = _a.split,
        _e = _a.starRadius,
        _f = _a.stroke,
        _g = _a.direction;
  }
  var VERSION = "0.0.2";

  var ShapeTri = ({
    dom: dom,
    poly: poly,
    be: be,
    VERSION: VERSION
  });

  return ShapeTri;

})));
//# sourceMappingURL=shapepoly.js.map
