import { oval, poly, rect, star } from "figur";
import { makeFigur } from "./makeFigur.js";

export const Star = makeFigur(star);
export const Oval = makeFigur(oval);
export const Poly = makeFigur(poly);
export const Rect = makeFigur(rect);
