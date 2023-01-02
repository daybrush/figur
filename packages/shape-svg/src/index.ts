import { CLASS_NAME, STROKE_LINEJOIN } from "./consts";
import { hasClass, addClass, splitUnit } from "@daybrush/utils";
import { createVirtualDOM, ShapeDOM } from "./VirtualDOM";

export interface Shape {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
    width?: number;
    height?: number;
    fill?: string;
    strokeLinejoin?: STROKE_LINEJOIN;
    strokeWidth?: number;
    className?: string;
    origin?: string | number;
    [key: string]: any;
}

export interface RoundRectShape extends Shape {
    round?: number;
    css?: boolean;
}
export interface PolyShape extends Shape {
    side?: number;
    split?: number;
    css?: boolean;
    innerRadius?: number;
}
export interface OvalShape extends Shape {
    r?: number;
    rx?: number;
    ry?: number;
}

function makeDOM(tag: string): ShapeDOM {
    if (typeof document === "undefined") {
        return createVirtualDOM(tag);
    } else {
        return document.createElementNS("http://www.w3.org/2000/svg", tag);
    }
}

function makeSVGDOM(): ShapeDOM {
    const el = makeDOM("svg");

    addClass(el as Element, CLASS_NAME);

    return el;
}
function setAttributes(element: ShapeDOM, attributes: { [key: string]: any }) {
    for (const name in attributes) {
        element.setAttribute(name, attributes[name]);
    }
}
function setStyles(element: ShapeDOM, styles: { [key: string]: any }) {
    const cssText = [];

    for (const name in styles) {
        cssText.push(`${name}:${styles[name]};`);
    }
    element.style.cssText += cssText.join("");
}
function getAbsoluteValue(value: string, pos: number, size: number) {
    const info = splitUnit(value);

    if (info.unit === "%") {
        return (pos + size * info.value / 100) + "px";
    } else if (info.unit === "px") {
        return (pos + info.value) + "px";
    } else {
        return `calc(${pos}px + ${value})`;
    }
}
function setOrigin(container: ShapeDOM, {
    width,
    height,
    left,
    top,
    origin,
}: {
    width: number,
    height: number,
    left: number,
    top: number,
    origin: string | number,
}) {
    if (!origin) {
        return;
    }
    let [ox, oy = ox]: string[] = `${origin}`.split(" ");

    ox = getAbsoluteValue(ox, left, width);
    oy = getAbsoluteValue(oy, top, height);

    container.style.cssText += `transform-origin: ${ox} ${oy};`;
}
function setViewBox(container: ShapeDOM, {
    width,
    height,
    left,
    right,
    bottom,
    top,
    strokeWidth,
    className,
}: {
    width: number,
    height: number,
    left: number,
    right: number,
    bottom: number,
    top: number,
    strokeWidth: number,
    className?: string,
}) {
    if (container && hasClass(container as Element, CLASS_NAME)) {
        className && className.split(" ").forEach(name => {
            addClass(container as Element, name);
        });
        const [, , boxWidth = 0, boxHeight = 0] = (container.getAttribute("viewBox") || "").split(" ")
            .map(pos => parseFloat(pos || "0"));

        container.setAttribute("viewBox", "0 0 " +
            // tslint:disable-next-line:max-line-length
            `${Math.max(left + width + right + strokeWidth, boxWidth)} ${Math.max(top + height + bottom + strokeWidth, boxHeight)}`);
    }
}

export function getRect(shape: PolyShape) {
    const {
        left = 0,
        top = 0,
        side = 3,
        rotate = 0,
        innerRadius = 100,
        height = 0,
        split = 1,
        width = height ? 0 : 100,
        strokeLinejoin = "round",
        strokeWidth = 0,
    } = shape;
    let xPoints: number[] = [];
    let yPoints: number[] = [];
    const sideCos = Math.cos(Math.PI / side);
    const startRad = Math.PI / 180 * rotate + Math.PI * ((side % 2 ? 0 : 1 / side) - 1 / 2);

    for (let i = 0; i < side; ++i) {
        const rad = Math.PI * (1 / side * 2 * i) + startRad;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

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
    const minX = Math.min(...xPoints);
    const minY = Math.min(...yPoints);
    const maxX = Math.max(...xPoints);
    const maxY = Math.max(...yPoints);
    const isWidth = !!width;
    const scale = isWidth ? width / (maxX - minX) : height / (maxY - minY);
    const isOuter = strokeLinejoin === "miter" || strokeLinejoin === "arcs" || strokeLinejoin === "miter-clip";

    const sideSin = Math.sin(Math.PI / side);
    const innerCos = Math.min(sideCos, innerRadius / 100);
    const innerScale = scale * innerCos;
    const diagonal = strokeWidth / 2 / (sideCos === innerCos ? 1 : Math.sin(Math.atan(sideSin / (sideCos - innerCos))));
    const outerScale = isOuter ? (innerScale + diagonal) / innerScale : 1;
    const pos = isOuter ? 0 : strokeWidth / 2;

    xPoints = xPoints.map(xp => (xp - minX * outerScale) * scale + pos);
    yPoints = yPoints.map(yp => (yp - minY * outerScale) * scale + pos);

    const pathWidth = (maxX - minX) * outerScale * scale + pos * 2;
    const pathHeight = (maxY - minY) * outerScale * scale + pos * 2;
    const length = xPoints.length;
    const points = [];

    points.push([left + xPoints[0], top + yPoints[0]]);
    for (let i = 1; i <= length; ++i) {
        const x1 = xPoints[i - 1];
        const y1 = yPoints[i - 1];
        const x2 = xPoints[i === length ? 0 : i];
        const y2 = yPoints[i === length ? 0 : i];

        for (let j = 1; j <= split; ++j) {
            const x = (x1 * (split - j) + x2 * j) / split;
            const y = (y1 * (split - j) + y2 * j) / split;

            points.push([left + x, top + y]);
        }
    }

    return { points, width: pathWidth, height: pathHeight };
}

export function getPath(points: number[][]) {
    return points.map((point, i) => {
        return `${i === 0 ? "M" : "L"} ${point.join(" ")}`;
    }).join(" ") + " Z";
}

export function be(path: SVGPathElement, shape: PolyShape, container?: ShapeDOM) {
    const {
        left = 0,
        top = 0,
        right = 0,
        bottom = 0,
        side,
        split,
        rotate,
        innerRadius,
        height,
        width,
        fill = "transparent",
        strokeLinejoin = "round",
        strokeWidth = 0,
        css = false,
        className,
        ...attributes
    } = shape
    const {
        points,
        width: pathWidth,
        height: pathHeight
    } = getRect({
        left, top, split, side, rotate, width,
        height, innerRadius, strokeLinejoin, strokeWidth,
    });

    setViewBox(container, {
        left,
        top,
        bottom,
        right,
        className,
        strokeWidth: 0,
        width: pathWidth,
        height: pathHeight,
    });
    const d = getPath(points);

    css ? setStyles(path, { d: `path('${d}')` }) : setAttributes(path, { d });

    setAttributes(path, {
        fill,
        "stroke-linejoin": strokeLinejoin,
        "stroke-width": `${strokeWidth}`,
        ...attributes,
    });
}

export function star(shape: PolyShape, container?: ShapeDOM) {
    const {
        side = 3,
        innerRadius = 60 * Math.cos(Math.PI / side),
    } = shape;
    return poly({ ...arguments[0], innerRadius }, container);
}

export function poly(shape: PolyShape, container: ShapeDOM = makeSVGDOM()) {
    const path: SVGPathElement = makeDOM("path") as SVGPathElement;

    be(path, shape, container);
    container.appendChild(path);

    return container as SVGElement;
}

export function oval(shape: OvalShape, container: ShapeDOM = makeSVGDOM()) {
    const {
        left = 0,
        top = 0,
        right = 0,
        bottom = 0,
        fill = "transparent",
        strokeLinejoin = "round",
        strokeWidth = 0,
        className,
        r = 0,
        rx = r,
        ry = r,
        width = rx * 2,
        height = ry * 2,
        origin,
        ...attributes
    } = shape;
    const ellipse: SVGEllipseElement = makeDOM("ellipse") as SVGEllipseElement;
    const halfStroke = strokeWidth / 2;

    setViewBox(container, {
        strokeWidth,
        left,
        top,
        bottom,
        right,
        className,
        width,
        height,
    });
    setOrigin(ellipse, {
        left: left + halfStroke,
        top: top + halfStroke,
        width,
        height,
        origin,
    });

    setAttributes(ellipse, {
        fill,
        "cx": left + halfStroke + width / 2,
        "cy": top + halfStroke + height / 2,
        "rx": width / 2,
        "ry": height / 2,
        "stroke-linejoin": strokeLinejoin,
        "stroke-width": `${strokeWidth}`,
        ...attributes,
    });
    container.appendChild(ellipse);

    return container as SVGElement;
}

export function rect(
    shape: RoundRectShape,
    container: ShapeDOM = makeSVGDOM(),
) {
    const {
        left = 0,
        top = 0,
        right = 0,
        bottom = 0,
        round = 0,
        width,
        height,
        fill = "transparent",
        strokeLinejoin = "round",
        strokeWidth = 0,
        css = false,
        className,
        ...attributes
    } = shape;
    const path: SVGPathElement = makeDOM("path") as SVGPathElement;
    setViewBox(container, {
        left,
        top,
        bottom,
        right,
        className,
        width,
        height,
        strokeWidth,
    });
    setOrigin(path, {
        left,
        top,
        width,
        height,
        origin,
    });
    const halfStroke = strokeWidth / 2;
    const pathWidth = width - round * 2;
    const pathHeight = height - round * 2;
    // tslint:disable-next-line:max-line-length
    const d = `M${left + round + halfStroke},${top + halfStroke} h${pathWidth} a${round},${round} 0 0 1 ${round},${round} v${pathHeight} a${round},${round} 0 0 1 -${round},${round} h-${pathWidth} a${round},${round} 0 0 1 -${round},-${round} v-${pathHeight} a${round},${round} 0 0 1 ${round},-${round} z`;

    css ? setStyles(path, { d: `path('${d}')` }) : setAttributes(path, { d });

    setAttributes(path, {
        fill,
        "stroke-linejoin": strokeLinejoin,
        "stroke-width": `${strokeWidth}`,
        ...attributes,
    });
    container.appendChild(path);

    return container as SVGElement;
}

export * from "./VirtualDOM";
