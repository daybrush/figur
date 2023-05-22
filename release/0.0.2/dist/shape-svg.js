/*
Copyright (c) Daybrush
name: shape-svg
license: MIT
author: Daybrush
repository: https://github.com/daybrush/shape-svg
version: 0.4.0
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Shape = factory());
})(this, (function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
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
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    var CLASS_NAME = "__shape-svg";

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.10.2
    */
    /**
    * get string "string"
    * @memberof Consts
    * @example
    import {STRING} from "@daybrush/utils";

    console.log(STRING); // "string"
    */
    var STRING = "string";
    var OPEN_CLOSED_CHARACTERS = [{
      open: "(",
      close: ")"
    }, {
      open: "\"",
      close: "\""
    }, {
      open: "'",
      close: "'"
    }, {
      open: "\\\"",
      close: "\\\""
    }, {
      open: "\\'",
      close: "\\'"
    }];

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
      return r;
    }
    /**
    * Check the type that the value is string.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isString} from "@daybrush/utils";

    console.log(isString("1234")); // true
    console.log(isString(undefined)); // false
    console.log(isString(1)); // false
    console.log(isString(null)); // false
    */
    function isString(value) {
      return typeof value === STRING;
    }
    function isEqualSeparator(character, separator) {
      var isCharacterSpace = character === "" || character == " ";
      var isSeparatorSpace = separator === "" || separator == " ";
      return isSeparatorSpace && isCharacterSpace || character === separator;
    }
    function findOpen(openCharacter, texts, index, length, openCloseCharacters) {
      var isIgnore = findIgnore(openCharacter, texts, index);
      if (!isIgnore) {
        return findClose(openCharacter, texts, index + 1, length, openCloseCharacters);
      }
      return index;
    }
    function findIgnore(character, texts, index) {
      if (!character.ignore) {
        return null;
      }
      var otherText = texts.slice(Math.max(index - 3, 0), index + 3).join("");
      return new RegExp(character.ignore).exec(otherText);
    }
    function findClose(closeCharacter, texts, index, length, openCloseCharacters) {
      var _loop_1 = function (i) {
        var character = texts[i].trim();
        if (character === closeCharacter.close && !findIgnore(closeCharacter, texts, i)) {
          return {
            value: i
          };
        }
        var nextIndex = i;
        // re open
        var openCharacter = find(openCloseCharacters, function (_a) {
          var open = _a.open;
          return open === character;
        });
        if (openCharacter) {
          nextIndex = findOpen(openCharacter, texts, i, length, openCloseCharacters);
        }
        if (nextIndex === -1) {
          return out_i_1 = i, "break";
        }
        i = nextIndex;
        out_i_1 = i;
      };
      var out_i_1;
      for (var i = index; i < length; ++i) {
        var state_1 = _loop_1(i);
        i = out_i_1;
        if (typeof state_1 === "object") return state_1.value;
        if (state_1 === "break") break;
      }
      return -1;
    }
    function splitText(text, splitOptions) {
      var _a = isString(splitOptions) ? {
          separator: splitOptions
        } : splitOptions,
        _b = _a.separator,
        separator = _b === void 0 ? "," : _b,
        isSeparateFirst = _a.isSeparateFirst,
        isSeparateOnlyOpenClose = _a.isSeparateOnlyOpenClose,
        _c = _a.isSeparateOpenClose,
        isSeparateOpenClose = _c === void 0 ? isSeparateOnlyOpenClose : _c,
        _d = _a.openCloseCharacters,
        openCloseCharacters = _d === void 0 ? OPEN_CLOSED_CHARACTERS : _d;
      var openClosedText = openCloseCharacters.map(function (_a) {
        var open = _a.open,
          close = _a.close;
        if (open === close) {
          return open;
        }
        return open + "|" + close;
      }).join("|");
      var regexText = "(\\s*" + separator + "\\s*|" + openClosedText + "|\\s+)";
      var regex = new RegExp(regexText, "g");
      var texts = text.split(regex).filter(Boolean);
      var length = texts.length;
      var values = [];
      var tempValues = [];
      function resetTemp() {
        if (tempValues.length) {
          values.push(tempValues.join(""));
          tempValues = [];
          return true;
        }
        return false;
      }
      var _loop_2 = function (i) {
        var character = texts[i].trim();
        var nextIndex = i;
        var openCharacter = find(openCloseCharacters, function (_a) {
          var open = _a.open;
          return open === character;
        });
        var closeCharacter = find(openCloseCharacters, function (_a) {
          var close = _a.close;
          return close === character;
        });
        if (openCharacter) {
          nextIndex = findOpen(openCharacter, texts, i, length, openCloseCharacters);
          if (nextIndex !== -1 && isSeparateOpenClose) {
            if (resetTemp() && isSeparateFirst) {
              return out_i_2 = i, "break";
            }
            values.push(texts.slice(i, nextIndex + 1).join(""));
            i = nextIndex;
            if (isSeparateFirst) {
              return out_i_2 = i, "break";
            }
            return out_i_2 = i, "continue";
          }
        } else if (closeCharacter && !findIgnore(closeCharacter, texts, i)) {
          var nextOpenCloseCharacters = __spreadArrays(openCloseCharacters);
          nextOpenCloseCharacters.splice(openCloseCharacters.indexOf(closeCharacter), 1);
          return {
            value: splitText(text, {
              separator: separator,
              isSeparateFirst: isSeparateFirst,
              isSeparateOnlyOpenClose: isSeparateOnlyOpenClose,
              isSeparateOpenClose: isSeparateOpenClose,
              openCloseCharacters: nextOpenCloseCharacters
            })
          };
        } else if (isEqualSeparator(character, separator) && !isSeparateOnlyOpenClose) {
          resetTemp();
          if (isSeparateFirst) {
            return out_i_2 = i, "break";
          }
          return out_i_2 = i, "continue";
        }
        if (nextIndex === -1) {
          nextIndex = length - 1;
        }
        tempValues.push(texts.slice(i, nextIndex + 1).join(""));
        i = nextIndex;
        out_i_2 = i;
      };
      var out_i_2;
      for (var i = 0; i < length; ++i) {
        var state_2 = _loop_2(i);
        i = out_i_2;
        if (typeof state_2 === "object") return state_2.value;
        if (state_2 === "break") break;
      }
      if (tempValues.length) {
        values.push(tempValues.join(""));
      }
      return values;
    }
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
    * transform strings to camel-case
    * @memberof Utils
    * @param {String} text - string
    * @return {String} camel-case string
    * @example
    import {camelize} from "@daybrush/utils";

    console.log(camelize("transform-origin")); // transformOrigin
    console.log(camelize("abcd_efg")); // abcdEfg
    console.log(camelize("abcd efg")); // abcdEfg
    */
    function camelize(str) {
      return str.replace(/[\s-_]([a-z])/g, function (all, letter) {
        return letter.toUpperCase();
      });
    }
    /**
    * Returns the index of the first element in the array that satisfies the provided testing function.
    * @function
    * @memberof CrossBrowser
    * @param - The array `findIndex` was called upon.
    * @param - A function to execute on each value in the array until the function returns true, indicating that the satisfying element was found.
    * @param - Returns defaultIndex if not found by the function.
    * @example
    import { findIndex } from "@daybrush/utils";

    findIndex([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // 1
    */
    function findIndex(arr, callback, defaultIndex) {
      if (defaultIndex === void 0) {
        defaultIndex = -1;
      }
      var length = arr.length;
      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i, arr)) {
          return i;
        }
      }
      return defaultIndex;
    }
    /**
    * Returns the value of the first element in the array that satisfies the provided testing function.
    * @function
    * @memberof CrossBrowser
    * @param - The array `find` was called upon.
    * @param - A function to execute on each value in the array,
    * @param - Returns defalutValue if not found by the function.
    * @example
    import { find } from "@daybrush/utils";

    find([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // {a: 2}
    */
    function find(arr, callback, defalutValue) {
      var index = findIndex(arr, callback);
      return index > -1 ? arr[index] : defalutValue;
    }
    /**
    * @function
    * @memberof Utils
    */
    function getKeys(obj) {
      return Object.keys(obj);
    }
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

    function splitStyle(str) {
        var properties = splitText(str, ";");
        var obj = {};
        var totalLength = properties.length;
        var length = totalLength;
        for (var i = 0; i < totalLength; ++i) {
            var matches = splitText(properties[i], ":");
            if (matches.length < 2 || !matches[1]) {
                --length;
                continue;
            }
            obj[camelize(matches[0].trim())] = matches[1].trim();
        }
        return {
            styles: obj,
            length: length
        };
    }
    function createVirtualDOM(tagName) {
        var attrs = [];
        var attributeMap = {};
        var attributes = {
            item: function (index) {
                return attrs[index] || null;
            },
            get length() {
                return attrs.length;
            },
        };
        var styles = {};
        var keys = [];
        var style = {
            get length() {
                return keys.length;
            },
            getPropertyValue: function (name) {
                return styles[name];
            },
            item: function (index) {
                return styles[keys[index]];
            },
            get cssText() {
                return keys.map(function (key) { return "".concat(key, ": ").concat(styles[key], ";"); }).join("");
            },
            set cssText(text) {
                var nextStyles = splitStyle(text).styles;
                styles = nextStyles;
                keys = getKeys(styles);
            },
        };
        var children = [];
        return {
            tagName: tagName,
            attributes: attributes,
            children: children,
            className: "",
            appendChild: function (child) {
                children.push(child);
            },
            getAttribute: function (name) {
                var _a, _b;
                return (_b = (_a = attributeMap[name]) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : null;
            },
            setAttribute: function (name, value) {
                if (!attributeMap[name]) {
                    var attr = {
                        name: name,
                        value: value,
                    };
                    attrs.push(attr);
                    attributeMap[name] = attr;
                }
                attributeMap[name].value = value;
            },
            style: style,
        };
    }

    function makeDOM(tag) {
        if (typeof document === "undefined") {
            return createVirtualDOM(tag);
        }
        else {
            return document.createElementNS("http://www.w3.org/2000/svg", tag);
        }
    }
    function makeSVGDOM() {
        var el = makeDOM("svg");
        addClass(el, CLASS_NAME);
        return el;
    }
    function setAttributes(element, attributes) {
        for (var name_1 in attributes) {
            element.setAttribute(name_1, attributes[name_1]);
        }
    }
    function setStyles(element, styles) {
        var cssText = [];
        for (var name_2 in styles) {
            cssText.push("".concat(name_2, ":").concat(styles[name_2], ";"));
        }
        element.style.cssText += cssText.join("");
    }
    function getAbsoluteValue(value, pos, size) {
        var info = splitUnit(value);
        if (info.unit === "%") {
            return (pos + size * info.value / 100) + "px";
        }
        else if (info.unit === "px") {
            return (pos + info.value) + "px";
        }
        else {
            return "calc(".concat(pos, "px + ").concat(value, ")");
        }
    }
    function setOrigin(container, _a) {
        var width = _a.width, height = _a.height, left = _a.left, top = _a.top, origin = _a.origin;
        if (!origin) {
            return;
        }
        var _b = "".concat(origin).split(" "), ox = _b[0], _c = _b[1], oy = _c === void 0 ? ox : _c;
        ox = getAbsoluteValue(ox, left, width);
        oy = getAbsoluteValue(oy, top, height);
        container.style.cssText += "transform-origin: ".concat(ox, " ").concat(oy, ";");
    }
    function setViewBox(container, _a) {
        var width = _a.width, height = _a.height, left = _a.left, right = _a.right, bottom = _a.bottom, top = _a.top, strokeWidth = _a.strokeWidth, className = _a.className;
        if (container && hasClass(container, CLASS_NAME)) {
            className && className.split(" ").forEach(function (name) {
                addClass(container, name);
            });
            var _b = (container.getAttribute("viewBox") || "").split(" ")
                .map(function (pos) { return parseFloat(pos || "0"); }), _c = _b[2], boxWidth = _c === void 0 ? 0 : _c, _d = _b[3], boxHeight = _d === void 0 ? 0 : _d;
            container.setAttribute("viewBox", "0 0 " +
                // tslint:disable-next-line:max-line-length
                "".concat(Math.max(left + width + right + strokeWidth, boxWidth), " ").concat(Math.max(top + height + bottom + strokeWidth, boxHeight)));
        }
    }
    function getRect(shape) {
        var _a = shape.left, left = _a === void 0 ? 0 : _a, _b = shape.top, top = _b === void 0 ? 0 : _b, _c = shape.side, side = _c === void 0 ? 3 : _c, _d = shape.rotate, rotate = _d === void 0 ? 0 : _d, _e = shape.innerRadius, innerRadius = _e === void 0 ? 100 : _e, _f = shape.height, height = _f === void 0 ? 0 : _f, _g = shape.split, split = _g === void 0 ? 1 : _g, _h = shape.width, width = _h === void 0 ? height ? 0 : 100 : _h, _j = shape.strokeLinejoin, strokeLinejoin = _j === void 0 ? "round" : _j, _k = shape.strokeWidth, strokeWidth = _k === void 0 ? 0 : _k;
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
                }
                else {
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
        xPoints = xPoints.map(function (xp) { return (xp - minX * outerScale) * scale + pos; });
        yPoints = yPoints.map(function (yp) { return (yp - minY * outerScale) * scale + pos; });
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
        return { points: points, width: pathWidth, height: pathHeight };
    }
    function getPath(points) {
        return points.map(function (point, i) {
            return "".concat(i === 0 ? "M" : "L", " ").concat(point.join(" "));
        }).join(" ") + " Z";
    }
    function be(path, shape, container) {
        var _a = shape.left, left = _a === void 0 ? 0 : _a, _b = shape.top, top = _b === void 0 ? 0 : _b, _c = shape.right, right = _c === void 0 ? 0 : _c, _d = shape.bottom, bottom = _d === void 0 ? 0 : _d, side = shape.side, split = shape.split, rotate = shape.rotate, innerRadius = shape.innerRadius, height = shape.height, width = shape.width, _e = shape.fill, fill = _e === void 0 ? "transparent" : _e, _f = shape.strokeLinejoin, strokeLinejoin = _f === void 0 ? "round" : _f, _g = shape.strokeWidth, strokeWidth = _g === void 0 ? 0 : _g, _h = shape.css, css = _h === void 0 ? false : _h, className = shape.className, attributes = __rest(shape, ["left", "top", "right", "bottom", "side", "split", "rotate", "innerRadius", "height", "width", "fill", "strokeLinejoin", "strokeWidth", "css", "className"]);
        var _j = getRect({
            left: left,
            top: top,
            split: split,
            side: side,
            rotate: rotate,
            width: width,
            height: height,
            innerRadius: innerRadius,
            strokeLinejoin: strokeLinejoin,
            strokeWidth: strokeWidth,
        }), points = _j.points, pathWidth = _j.width, pathHeight = _j.height;
        setViewBox(container, {
            left: left,
            top: top,
            bottom: bottom,
            right: right,
            className: className,
            strokeWidth: 0,
            width: pathWidth,
            height: pathHeight,
        });
        var d = getPath(points);
        css ? setStyles(path, { d: "path('".concat(d, "')") }) : setAttributes(path, { d: d });
        setAttributes(path, __assign({ fill: fill, "stroke-linejoin": strokeLinejoin, "stroke-width": "".concat(strokeWidth) }, attributes));
    }
    function star(shape, container) {
        var _a = shape.side, side = _a === void 0 ? 3 : _a, _b = shape.innerRadius, innerRadius = _b === void 0 ? 60 * Math.cos(Math.PI / side) : _b;
        return poly(__assign(__assign({}, arguments[0]), { innerRadius: innerRadius }), container);
    }
    function poly(shape, container) {
        if (container === void 0) { container = makeSVGDOM(); }
        var path = makeDOM("path");
        be(path, shape, container);
        container.appendChild(path);
        return container;
    }
    function oval(shape, container) {
        if (container === void 0) { container = makeSVGDOM(); }
        var _a = shape.left, left = _a === void 0 ? 0 : _a, _b = shape.top, top = _b === void 0 ? 0 : _b, _c = shape.right, right = _c === void 0 ? 0 : _c, _d = shape.bottom, bottom = _d === void 0 ? 0 : _d, _e = shape.fill, fill = _e === void 0 ? "transparent" : _e, _f = shape.strokeLinejoin, strokeLinejoin = _f === void 0 ? "round" : _f, _g = shape.strokeWidth, strokeWidth = _g === void 0 ? 0 : _g, className = shape.className, _h = shape.r, r = _h === void 0 ? 0 : _h, _j = shape.rx, rx = _j === void 0 ? r : _j, _k = shape.ry, ry = _k === void 0 ? r : _k, _l = shape.width, width = _l === void 0 ? rx * 2 : _l, _m = shape.height, height = _m === void 0 ? ry * 2 : _m, origin = shape.origin, attributes = __rest(shape, ["left", "top", "right", "bottom", "fill", "strokeLinejoin", "strokeWidth", "className", "r", "rx", "ry", "width", "height", "origin"]);
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
            height: height,
        });
        setOrigin(ellipse, {
            left: left + halfStroke,
            top: top + halfStroke,
            width: width,
            height: height,
            origin: origin,
        });
        setAttributes(ellipse, __assign({ fill: fill, "cx": left + halfStroke + width / 2, "cy": top + halfStroke + height / 2, "rx": width / 2, "ry": height / 2, "stroke-linejoin": strokeLinejoin, "stroke-width": "".concat(strokeWidth) }, attributes));
        container.appendChild(ellipse);
        return container;
    }
    function rect(shape, container) {
        if (container === void 0) { container = makeSVGDOM(); }
        var _a = shape.left, left = _a === void 0 ? 0 : _a, _b = shape.top, top = _b === void 0 ? 0 : _b, _c = shape.right, right = _c === void 0 ? 0 : _c, _d = shape.bottom, bottom = _d === void 0 ? 0 : _d, _e = shape.round, round = _e === void 0 ? 0 : _e, width = shape.width, height = shape.height, _f = shape.fill, fill = _f === void 0 ? "transparent" : _f, _g = shape.strokeLinejoin, strokeLinejoin = _g === void 0 ? "round" : _g, _h = shape.strokeWidth, strokeWidth = _h === void 0 ? 0 : _h, _j = shape.css, css = _j === void 0 ? false : _j, className = shape.className, attributes = __rest(shape, ["left", "top", "right", "bottom", "round", "width", "height", "fill", "strokeLinejoin", "strokeWidth", "css", "className"]);
        var path = makeDOM("path");
        setViewBox(container, {
            left: left,
            top: top,
            bottom: bottom,
            right: right,
            className: className,
            width: width,
            height: height,
            strokeWidth: strokeWidth,
        });
        setOrigin(path, {
            left: left,
            top: top,
            width: width,
            height: height,
            origin: origin,
        });
        var halfStroke = strokeWidth / 2;
        var pathWidth = width - round * 2;
        var pathHeight = height - round * 2;
        // tslint:disable-next-line:max-line-length
        var d = "M".concat(left + round + halfStroke, ",").concat(top + halfStroke, " h").concat(pathWidth, " a").concat(round, ",").concat(round, " 0 0 1 ").concat(round, ",").concat(round, " v").concat(pathHeight, " a").concat(round, ",").concat(round, " 0 0 1 -").concat(round, ",").concat(round, " h-").concat(pathWidth, " a").concat(round, ",").concat(round, " 0 0 1 -").concat(round, ",-").concat(round, " v-").concat(pathHeight, " a").concat(round, ",").concat(round, " 0 0 1 ").concat(round, ",-").concat(round, " z");
        css ? setStyles(path, { d: "path('".concat(d, "')") }) : setAttributes(path, { d: d });
        setAttributes(path, __assign({ fill: fill, "stroke-linejoin": strokeLinejoin, "stroke-width": "".concat(strokeWidth) }, attributes));
        container.appendChild(path);
        return container;
    }

    var Shape = {
        __proto__: null,
        getRect: getRect,
        getPath: getPath,
        be: be,
        star: star,
        poly: poly,
        oval: oval,
        rect: rect,
        createVirtualDOM: createVirtualDOM
    };

    return Shape;

}));
//# sourceMappingURL=shape-svg.js.map
