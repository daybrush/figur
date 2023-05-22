/*
Copyright (c) Daybrush
name: shape-svg
license: MIT
author: Daybrush
repository: https://github.com/daybrush/shape-svg
version: 0.4.0
*/
import { getKeys, splitText, camelize, addClass, hasClass, splitUnit } from '@daybrush/utils';

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

export { be, createVirtualDOM, getPath, getRect, oval, poly, rect, star };
//# sourceMappingURL=shape-svg.esm.js.map
