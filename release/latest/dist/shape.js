/*
Copyright (c) 2018 Daybrush
name: shape-svg
license: MIT
author: Daybrush
repository: https://github.com/daybrush/shape-svg
@version 0.3.4
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Shape = factory());
}(this, (function () { 'use strict';

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

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 0.5.2
    */
    /**
    * get string "undefined"
    * @memberof Consts
    * @example
    import {UNDEFINED} from "@daybrush/utils";

    console.log(UNDEFINED); // "undefined"
    */

    var UNDEFINED = "undefined";
    /**
    * Check whether the environment is window or node.js.
    * @memberof Consts
    * @example
    import {IS_WINDOW} from "@daybrush/utils";

    console.log(IS_WINDOW); // false in node.js
    console.log(IS_WINDOW); // true in browser
    */

    var IS_WINDOW = typeof window !== UNDEFINED;
    /**
    * Check whether the environment is window or node.js.
    * @memberof Consts
    * @name document
    * @example
    import {IS_WINDOW} from "@daybrush/utils";

    console.log(IS_WINDOW); // false in node.js
    console.log(IS_WINDOW); // true in browser
    */

    var doc = typeof document !== UNDEFINED && document;
    var prefixes = ["webkit", "ms", "moz", "o"];
    /**
     * @namespace CrossBrowser
     */

    /**
    * Get a CSS property with a vendor prefix that supports cross browser.
    * @function
    * @param {string} property - A CSS property
    * @return {string} CSS property with cross-browser vendor prefix
    * @memberof CrossBrowser
    * @example
    import {getCrossBrowserProperty} from "@daybrush/utils";

    console.log(getCrossBrowserProperty("transform")); // "transform", "-ms-transform", "-webkit-transform"
    console.log(getCrossBrowserProperty("filter")); // "filter", "-webkit-filter"
    */

    var getCrossBrowserProperty =
    /*#__PURE__*/
    function (property) {
      if (!doc) {
        return "";
      }

      var styles = (doc.body || doc.documentElement).style;
      var length = prefixes.length;

      if (typeof styles[property] !== UNDEFINED) {
        return property;
      }

      for (var i = 0; i < length; ++i) {
        var name = "-" + prefixes[i] + "-" + property;

        if (typeof styles[name] !== UNDEFINED) {
          return name;
        }
      }

      return "";
    };
    /**
    * get string "transfrom" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {TRANSFORM} from "@daybrush/utils";

    console.log(TRANSFORM); // "transform", "-ms-transform", "-webkit-transform"
    */


    var TRANSFORM =
    /*#__PURE__*/
    getCrossBrowserProperty("transform");
    /**
    * get string "filter" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {FILTER} from "@daybrush/utils";

    console.log(FILTER); // "filter", "-ms-filter", "-webkit-filter"
    */

    var FILTER =
    /*#__PURE__*/
    getCrossBrowserProperty("filter");
    /**
    * get string "animation" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {ANIMATION} from "@daybrush/utils";

    console.log(ANIMATION); // "animation", "-ms-animation", "-webkit-animation"
    */

    var ANIMATION =
    /*#__PURE__*/
    getCrossBrowserProperty("animation");
    /**
    * get string "keyframes" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {KEYFRAMES} from "@daybrush/utils";

    console.log(KEYFRAMES); // "keyframes", "-ms-keyframes", "-webkit-keyframes"
    */

    var KEYFRAMES =
    /*#__PURE__*/
    ANIMATION.replace("animation", "keyframes");
    /**
    * divide text by number and unit.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {} divided texts
    * @example
    import {splitUnit} from "@daybrush/utils";

    console.log(splitUnit("10px"));
    // {prefix: "", value: 10, unit: "px"}
    console.log(splitUnit("-10px"));
    // {prefix: "", value: -10, unit: "px"}
    console.log(splitUnit("a10%"));
    // {prefix: "a", value: 10, unit: "%"}
    */


    function splitUnit(text) {
      var matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);

      if (!matches) {
        return {
          prefix: "",
          unit: "",
          value: NaN
        };
      }

      var prefix = matches[1];
      var value = matches[2];
      var unit = matches[3];
      return {
        prefix: prefix,
        unit: unit,
        value: parseFloat(value)
      };
    }
    /**
    * Date.now() method
    * @memberof CrossBrowser
    * @return {number} milliseconds
    * @example
    import {now} from "@daybrush/utils";

    console.log(now()); // 12121324241(milliseconds)
    */


    function now() {
      return Date.now ? Date.now() : new Date().getTime();
    }
    /**
    * window.requestAnimationFrame() method with cross browser.
    * @function
    * @memberof CrossBrowser
    * @param {FrameRequestCallback} callback - The function to call when it's time to update your animation for the next repaint.
    * @return {number} id
    * @example
    import {requestAnimationFrame} from "@daybrush/utils";

    requestAnimationFrame((timestamp) => {
      console.log(timestamp);
    });
    */


    var requestAnimationFrame =
    /*#__PURE__*/
    function () {
      var firstTime = now();
      var raf = IS_WINDOW && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame);
      return raf ? raf.bind(window) : function (callback) {
        var currTime = now();
        var id = window.setTimeout(function () {
          callback(currTime - firstTime);
        }, 1000 / 60);
        return id;
      };
    }();
    /**
    * Checks if the specified class value exists in the element's class attribute.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to search
    * @return {boolean} return false if the class is not found.
    * @example
    import {hasClass} from "@daybrush/utils";

    console.log(hasClass(element, "start")); // true or false
    */


    function hasClass(element, className) {
      if (element.classList) {
        return element.classList.contains(className);
      }

      return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
    }
    /**
    * Add the specified class value. If these classe already exist in the element's class attribute they are ignored.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to add
    * @example
    import {addClass} from "@daybrush/utils";

    addClass(element, "start");
    */


    function addClass(element, className) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        element.className += " " + className;
      }
    }

    function makeDOM(tag) {
      return document.createElementNS("http://www.w3.org/2000/svg", tag);
    }

    function makeSVGDOM() {
      var el = makeDOM("svg");
      addClass(el, CLASS_NAME);
      return el;
    }

    function setAttributes(element, attributes) {
      for (var name in attributes) {
        element.setAttribute(name, attributes[name]);
      }
    }

    function setStyles(element, styles) {
      var cssText = [];

      for (var name in styles) {
        cssText.push(name + ":" + styles[name] + ";");
      }

      element.style.cssText += cssText.join("");
    }

    function getAbsoluteValue(value, pos, size) {
      var info = splitUnit(value);

      if (info.unit === "%") {
        return pos + size * info.value / 100 + "px";
      } else if (info.unit === "px") {
        return pos + info.value + "px";
      } else {
        return "calc(" + pos + "px + " + value + ")";
      }
    }

    function setOrigin(container, _a) {
      var width = _a.width,
          height = _a.height,
          left = _a.left,
          top = _a.top,
          origin = _a.origin;

      if (!origin) {
        return;
      }

      var _b = ("" + origin).split(" "),
          ox = _b[0],
          _c = _b[1],
          oy = _c === void 0 ? ox : _c;

      ox = getAbsoluteValue(ox, left, width);
      oy = getAbsoluteValue(oy, top, height);
      container.style.transformOrigin = ox + " " + oy;
    }

    function setViewBox(container, _a) {
      var width = _a.width,
          height = _a.height,
          left = _a.left,
          right = _a.right,
          bottom = _a.bottom,
          top = _a.top,
          strokeWidth = _a.strokeWidth,
          className = _a.className;

      if (container && hasClass(container, CLASS_NAME)) {
        className && className.split(" ").forEach(function (name) {
          addClass(container, name);
        });

        var _b = (container.getAttribute("viewBox") || "").split(" ").map(function (pos) {
          return parseFloat(pos || "0");
        }),
            _c = _b[2],
            boxWidth = _c === void 0 ? 0 : _c,
            _d = _b[3],
            boxHeight = _d === void 0 ? 0 : _d;

        container.setAttribute("viewBox", "0 0 " + ( // tslint:disable-next-line:max-line-length
        Math.max(left + width + right + strokeWidth, boxWidth) + " " + Math.max(top + height + bottom + strokeWidth, boxHeight)));
      }
    }

    function getRect(_a) {
      var _b = _a.left,
          left = _b === void 0 ? 0 : _b,
          _c = _a.top,
          top = _c === void 0 ? 0 : _c,
          _d = _a.side,
          side = _d === void 0 ? 3 : _d,
          _e = _a.rotate,
          rotate = _e === void 0 ? 0 : _e,
          _f = _a.innerRadius,
          innerRadius = _f === void 0 ? 100 : _f,
          _g = _a.height,
          height = _g === void 0 ? 0 : _g,
          _h = _a.split,
          split = _h === void 0 ? 1 : _h,
          _j = _a.width,
          width = _j === void 0 ? height ? 0 : 100 : _j,
          _k = _a.strokeLinejoin,
          strokeLinejoin = _k === void 0 ? "round" : _k,
          _l = _a.strokeWidth,
          strokeWidth = _l === void 0 ? 0 : _l;
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
      var sideSin = Math.sin(Math.PI / side);
      var innerCos = Math.min(sideCos, innerRadius / 100);
      var innerScale = scale * innerCos;
      var diagonal = strokeWidth / 2 / (sideCos === innerCos ? 1 : Math.sin(Math.atan(sideSin / (sideCos - innerCos))));
      var outerScale = isOuter ? (innerScale + diagonal) / innerScale : 1;
      var pos = isOuter ? 0 : strokeWidth / 2;
      xPoints = xPoints.map(function (xp) {
        return (xp - minX * outerScale) * scale + pos;
      });
      yPoints = yPoints.map(function (yp) {
        return (yp - minY * outerScale) * scale + pos;
      });
      var pathWidth = (maxX - minX) * outerScale * scale + pos * 2;
      var pathHeight = (maxY - minY) * outerScale * scale + pos * 2;
      var length = xPoints.length;
      var points = [];
      points.push([left + xPoints[0], top + yPoints[0]]);

      for (var i = 1; i <= length; ++i) {
        var x1 = xPoints[i - 1];
        var y1 = yPoints[i - 1];
        var x2 = xPoints[i === length ? 0 : i];
        var y2 = yPoints[i === length ? 0 : i];

        for (var j = 1; j <= split; ++j) {
          var x = (x1 * (split - j) + x2 * j) / split;
          var y = (y1 * (split - j) + y2 * j) / split;
          points.push([left + x, top + y]);
        }
      }

      return {
        points: points,
        width: pathWidth,
        height: pathHeight
      };
    }
    function getPath(points) {
      return points.map(function (point, i) {
        return (i === 0 ? "M" : "L") + " " + point.join(" ");
      }).join(" ") + " Z";
    }
    function be(path, _a, container) {
      var _b = _a.left,
          left = _b === void 0 ? 0 : _b,
          _c = _a.top,
          top = _c === void 0 ? 0 : _c,
          _d = _a.right,
          right = _d === void 0 ? 0 : _d,
          _e = _a.bottom,
          bottom = _e === void 0 ? 0 : _e,
          side = _a.side,
          split = _a.split,
          rotate = _a.rotate,
          innerRadius = _a.innerRadius,
          height = _a.height,
          width = _a.width,
          _f = _a.fill,
          fill = _f === void 0 ? "transparent" : _f,
          _g = _a.strokeLinejoin,
          strokeLinejoin = _g === void 0 ? "round" : _g,
          _h = _a.strokeWidth,
          strokeWidth = _h === void 0 ? 0 : _h,
          _j = _a.css,
          css = _j === void 0 ? false : _j,
          className = _a.className,
          attributes = __rest(_a, ["left", "top", "right", "bottom", "side", "split", "rotate", "innerRadius", "height", "width", "fill", "strokeLinejoin", "strokeWidth", "css", "className"]);

      var _k = getRect({
        left: left,
        top: top,
        split: split,
        side: side,
        rotate: rotate,
        width: width,
        height: height,
        innerRadius: innerRadius,
        strokeLinejoin: strokeLinejoin,
        strokeWidth: strokeWidth
      }),
          points = _k.points,
          pathWidth = _k.width,
          pathHeight = _k.height;

      setViewBox(container, {
        left: left,
        top: top,
        bottom: bottom,
        right: right,
        className: className,
        strokeWidth: 0,
        width: pathWidth,
        height: pathHeight
      });
      var d = getPath(points);
      css ? setStyles(path, {
        d: "path('" + d + "')"
      }) : setAttributes(path, {
        d: d
      });
      setAttributes(path, __assign({
        fill: fill,
        "stroke-linejoin": strokeLinejoin,
        "stroke-width": "" + strokeWidth
      }, attributes));
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
    function poly(options, container) {
      if (container === void 0) {
        container = makeSVGDOM();
      }

      var path = makeDOM("path");
      be(path, options, container);
      container.appendChild(path);
      return container;
    }
    function oval(_a, container) {
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
          _f = _a.fill,
          fill = _f === void 0 ? "transparent" : _f,
          _g = _a.strokeLinejoin,
          strokeLinejoin = _g === void 0 ? "round" : _g,
          _h = _a.strokeWidth,
          strokeWidth = _h === void 0 ? 0 : _h,
          className = _a.className,
          _j = _a.r,
          r = _j === void 0 ? 0 : _j,
          _k = _a.rx,
          rx = _k === void 0 ? r : _k,
          _l = _a.ry,
          ry = _l === void 0 ? r : _l,
          _m = _a.width,
          width = _m === void 0 ? rx * 2 : _m,
          _o = _a.height,
          height = _o === void 0 ? ry * 2 : _o,
          origin = _a.origin,
          attributes = __rest(_a, ["left", "top", "right", "bottom", "fill", "strokeLinejoin", "strokeWidth", "className", "r", "rx", "ry", "width", "height", "origin"]);

      var ellipse = makeDOM("ellipse");
      var halfStroke = strokeWidth / 2;
      setViewBox(container, {
        strokeWidth: strokeWidth,
        left: left,
        top: top,
        bottom: bottom,
        right: right,
        className: className,
        width: width,
        height: height
      });
      setOrigin(ellipse, {
        left: left + halfStroke,
        top: top + halfStroke,
        width: width,
        height: height,
        origin: origin
      });
      setAttributes(ellipse, __assign({
        fill: fill,
        "cx": left + halfStroke + width / 2,
        "cy": top + halfStroke + height / 2,
        "rx": width / 2,
        "ry": height / 2,
        "stroke-linejoin": strokeLinejoin,
        "stroke-width": "" + strokeWidth
      }, attributes));
      container.appendChild(ellipse);
      return container;
    }
    function rect(_a, container) {
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
          _f = _a.round,
          round = _f === void 0 ? 0 : _f,
          width = _a.width,
          height = _a.height,
          _g = _a.fill,
          fill = _g === void 0 ? "transparent" : _g,
          _h = _a.strokeLinejoin,
          strokeLinejoin = _h === void 0 ? "round" : _h,
          _j = _a.strokeWidth,
          strokeWidth = _j === void 0 ? 0 : _j,
          _k = _a.css,
          css = _k === void 0 ? false : _k,
          className = _a.className,
          attributes = __rest(_a, ["left", "top", "right", "bottom", "round", "width", "height", "fill", "strokeLinejoin", "strokeWidth", "css", "className"]);

      var path = makeDOM("path");
      setViewBox(container, {
        left: left,
        top: top,
        bottom: bottom,
        right: right,
        className: className,
        width: width,
        height: height,
        strokeWidth: strokeWidth
      });
      setOrigin(path, {
        left: left,
        top: top,
        width: width,
        height: height,
        origin: origin
      });
      var halfStroke = strokeWidth / 2;
      var pathWidth = width - round * 2;
      var pathHeight = height - round * 2; // tslint:disable-next-line:max-line-length

      var d = "M" + (left + round + halfStroke) + "," + (top + halfStroke) + " h" + pathWidth + " a" + round + "," + round + " 0 0 1 " + round + "," + round + " v" + pathHeight + " a" + round + "," + round + " 0 0 1 -" + round + "," + round + " h-" + pathWidth + " a" + round + "," + round + " 0 0 1 -" + round + ",-" + round + " v-" + pathHeight + " a" + round + "," + round + " 0 0 1 " + round + ",-" + round + " z";
      css ? setStyles(path, {
        d: "path('" + d + "')"
      }) : setAttributes(path, {
        d: d
      });
      setAttributes(path, __assign({
        fill: fill,
        "stroke-linejoin": strokeLinejoin,
        "stroke-width": "" + strokeWidth
      }, attributes));
      container.appendChild(path);
      return container;
    }
    var VERSION = "0.3.4";

    var Shape = ({
        getRect: getRect,
        getPath: getPath,
        be: be,
        star: star,
        poly: poly,
        oval: oval,
        rect: rect,
        VERSION: VERSION
    });

    return Shape;

})));
//# sourceMappingURL=shape.js.map
