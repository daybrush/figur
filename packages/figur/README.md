# figur  [![npm version](https://badge.fury.io/js/shape.svg)](https://badge.fury.io/js/figur)

![](./polygon.png)

Make CSS Polygon Shape

* [Polygons & Stars Demo](https://codepen.io/daybrush/pen/ReYxLy)

```sh
$ npm install figur
# or
$ yarn add figur
```

## Options
```ts
import {poly, star} from "figur";

import { CLASS_NAME, STROKE_LINEJOIN } from "./consts";

export interface Shape {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
    width?: number;
    heigh?t: number;
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

export function getPath(points: number[][]): string;  // path('M 0 0 L 0 0 Z');
export function be(path: SVGPathElement, options: PolyShape, container?: SVGElement): void;
export function star(options: PolyShape, container?: SVGElement): SVGElement;
export function poly(options: PolyShape, container?: SVGElement): SVGElement;
export function oval(options: OvalShape, container?: SVGElement): SVGElement;
export function rect(options: RoundRectShape, container?: SVGElement): SVGElement;
```


## How to Use
```html
<script src="//daybrush.com/figur/release/latest/dist/shape.js"></script>
<script src="//daybrush.com/figur/release/latest/dist/shape.min.js"></script>
```
```js
import {poly, star, be} from "figur";

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