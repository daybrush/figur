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

interface SVGInterface {
  x?: number;
  y?: number;
  side?: number;
  width?: number; // width or height
  height?: number;
  strokeWidth?: number;
  strokeLinejoin?: STROKE_LINEJOIN;
  innerRadius?: number;
  [key: string]: any; // polygon attributes or class (fill, ...)
}

function poly(options: SVGInterface, container?: SVGElement);
function star(options: SVGInterface, container?: SVGElement);

```


## How to Use

```html
<script src="//daybrush.github.io/shape-svg/release/latest/shapesvg.min.js"></script>
```
```js
import {poly, star} from "shape-svg";

// 10 star
// Shape.poly
const el = poly({width: 100, side: 10, strokeWidth: 5, fill: "transparent", strokeLinejoin: "round"});
// Shape.star
const el = star({width: 100, side: 10, innerRadius: 30, strokeWidth: 5, strokeLinejoin: "bavel"});

document.body.appendChild(el);

```