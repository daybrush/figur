import { CLASS_NAME, STROKE_LINEJOIN } from "./consts";

interface SVGInterface {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  side?: number;
  split?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  strokeLinejoin?: STROKE_LINEJOIN;
  innerRadius?: number;
  css?: boolean;
  [key: string]: any;
}

function makeDOM(tag: string) {
  return document.createElementNS("http://www.w3.org/2000/svg", tag);
}
function makeSVGDOM() {
  const el = makeDOM("svg");

  el.setAttribute("class", CLASS_NAME);
  return el;
}
function setAttributes(element: SVGElement, attributes: {[key: string]: any}) {
  for (const name in attributes) {
    element.setAttribute(name, attributes[name]);
  }
}
function setStyles(element: SVGElement, styles: {[key: string]: any}) {
  const cssText = [];

  for (const name in styles) {
    cssText.push(`${name}:${styles[name]};`);
  }
  element.style.cssText += cssText.join("");
}
export function getRect({
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
}: SVGInterface) {
  let xPoints: number[] = [];
  let yPoints: number[] = [];
  const sideCos = Math.cos(Math.PI / side);
  const startRad = Math.PI / 180 * rotate +  Math.PI * ((side % 2 ? 0 : 1 / side) - 1 / 2);

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

  return {points, width: pathWidth, height: pathHeight};
}
export function getPath(points: number[][]) {
  return points.map((point, i) => {
      return `${i === 0 ? "M" : "L"} ${point.join(" ")}`;
  }).join(" ") + " Z";
}
export function be(path: SVGPathElement, {
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
  ...attributes
}: SVGInterface,   container?: SVGElement) {
  const {points, width: pathWidth, height: pathHeight } =
    getRect({left, top, split, side, rotate, width, height, innerRadius, strokeLinejoin, strokeWidth});

  if (container && container.getAttribute("class") === CLASS_NAME) {
    container.setAttribute("viewBox", `0 0 ${left + pathWidth + right} ${top + pathHeight + bottom}`);
  }
  const d = getPath(points);

  css ? setStyles(path, {d : `path('${d}')`}) : setAttributes(path, {d});

  setAttributes(path, {
    fill,
    "stroke-linejoin": strokeLinejoin,
    "stroke-width": `${strokeWidth}`,
    ...attributes,
  });
}
export function star({
  side = 3,
  innerRadius = 60 * Math.cos(Math.PI / side),
}: SVGInterface,     container?: SVGAElement) {
  return poly({...arguments[0], innerRadius}, container);
}
export function poly(options: SVGInterface, container: SVGElement = makeSVGDOM()) {
  const path: SVGPathElement = makeDOM("path") as SVGPathElement;

  be(path, options, container);
  container.appendChild(path);
  return container;
}
export const VERSION = "#__VERSION__#";
