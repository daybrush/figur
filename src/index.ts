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
export function getRect({
  side = 3,
  rotate = 0,
  innerRadius = 100,
  width = 0,
  height = 0,
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

  const polygonWidth = (maxX - minX) * outerScale * scale + pos * 2;
  const polygonHeight = (maxY - minY) * outerScale * scale + pos * 2;
  const points = xPoints.map((xp, i) => [xp, yPoints[i]]);
  return {points, width: polygonWidth, height: polygonHeight};
}
export function star({
  side = 3,
  innerRadius = 60 * Math.cos(Math.PI / side),
}: SVGInterface,     container?: SVGAElement) {
  return poly({...arguments[0], innerRadius}, container);
}
export function poly({
  left = 0,
  top = 0,
  right = 0,
  bottom = 0,
  strokeWidth,
  strokeLinejoin = "round",
  fill = "transparent",
  side,
  width,
  height,
  rotate,
  innerRadius = 100,
  ...attributes
}: SVGInterface,     container: SVGElement = makeSVGDOM()) {
  const {points, width: polygonWidth, height: polygonHeight } =
    getRect({side, rotate, width, height, innerRadius, strokeLinejoin, strokeWidth});

  const polygon: SVGPolygonElement = makeDOM("polygon") as SVGPolygonElement;

  if (container.getAttribute("class") === CLASS_NAME) {
    container.setAttribute("viewBox", `0 0 ${left + polygonWidth + right} ${top + polygonHeight + bottom}`);
  }
  polygon.setAttribute("fill", fill);
  polygon.setAttribute("stroke-linejoin", strokeLinejoin);
  polygon.setAttribute("stroke-width", `${strokeWidth}`);
  polygon.setAttribute("points", points.map(point => `${left + point[0]},${top + point[1]}`).join(" "));

  for (const name in attributes) {
    polygon.setAttribute(name, attributes[name]);
  }
  container.appendChild(polygon);
  return container;
}
export const VERSION = "#__VERSION__#";
