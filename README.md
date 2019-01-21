# shape-svg  [![npm version](https://badge.fury.io/js/shape-svg.svg)](https://badge.fury.io/js/shape-svg)

![](./polygon.png)

Make CSS Polygon Shape

* [Polygons & Stars Demo](https://codepen.io/daybrush/pen/ReYxLy)

```sh
$ npm install shape-svg
```

## Options
```ts
import {poly, star} from "shape-svg";

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
  className?: string;
  [key: string]: any;
}

export function poly(options: SVGInterface, container?: SVGElement): SVGElement; // container(SVG)
export function star(options: SVGInterface, container?: SVGElement): SVGElement; // container(SVG)
export function be(path: SVGPathElement, options: SVGInterface, container?: SVGElement): void;
export function getRect(options: SVGInterface): {points: number[][], width: number, height: number};
export function getPath(points: number[][]): string; // path('M 0 0 L 0 0 Z');
```


## How to Use
```html
<script src="//daybrush.github.io/shape-svg/release/latest/shapesvg.min.js"></script>
```
```js
import {poly, star, be} from "shape-svg";

// 10 star
// Shape.poly
const el = poly({width: 100, side: 10, strokeWidth: 5, fill: "transparent", strokeLinejoin: "round"});
// Shape.star
const el = star({width: 100, css: true, side: 10, innerRadius: 30, strokeWidth: 5, strokeLinejoin: "bavel"});

document.body.appendChild(el);

// Shape.be
// 10 star => 5 polygon (split 4)
be(el, {width: 100, side: 5, css: true, split: 4, innerRadius: 30, strokeWidth: 5, strokeLinejoin: "bavel"});

```

## Animation(Transition)
use ```be``` function with ```{css: true}``` or change `d path` syle.

but ```side``` X ```split``` must be the same to be animated. (```star```(inner-radius) is ```split``` twice)

* ex) poly side: 6
  * star side: 3
  * poly side: 3, split: 2
* ex) poly side: 12, split: 2
  * star side: 4, split: 3
  * star side: 3, split: 4
  * poly side: 6, split: 4
  * poly side: 24, split: 1