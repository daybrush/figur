/* eslint-disable react-hooks/exhaustive-deps */

import { camelize } from "@daybrush/utils";
import * as React from "react";
import { oval, OvalFigur, poly, PolyFigur, rect, RoundRectFigur, FigurDOM, star } from "figur";

function elementToJsx(
    element: FigurDOM,
    key: string | number | null = null,
    reactStyle: React.CSSProperties = {},
    ref: React.ForwardedRef<SVGSVGElement> | null = null,
): JSX.Element {
    const TagName = element.tagName.toLowerCase() as any;
    const attributes = element.attributes;
    const attributesLength = attributes.length;
    const attributesProps: Record<string, any> = {};
    const children = element.children;
    const childrenLength = children.length;
    let className: any = element.className;
    const elementStyle = element.style!;
    const style: React.CSSProperties = {
        ...reactStyle,
    };
    const jsxChildren: JSX.Element[] = [];
    const styleLength = elementStyle!.length;

    for (let i = 0; i < styleLength; ++i) {
        const name = elementStyle.item(i);

        (style as any)[camelize(name)] = elementStyle.getPropertyValue(name);
    }
    for (let i = 0; i < attributesLength; ++i) {
        const name = camelize(attributes.item(i)!.name);

        if (name === "class") {
            continue;
        }
        attributesProps[camelize(attributes.item(i)!.name)] = attributes.item(i)!.value;
    }


    for (let i = 0; i < childrenLength; ++i) {
        jsxChildren.push(elementToJsx(children[i], i));
    }


    if (className && "baseVal" in className) {
        className = className.baseVal;
    }
    return <TagName ref={ref} {...attributesProps} className={className} key={key} style={style}>
        {jsxChildren}
    </TagName>;
}

export interface OvalProps extends OvalFigur {
    style?: React.CSSProperties;
}

export const Oval = React.forwardRef<SVGSVGElement, OvalProps>((props, ref) => {
    const { style, ...shape } = props;
    const ovalShape = React.useMemo(() => oval(shape) as FigurDOM, []);

    return elementToJsx(ovalShape, null, style, ref);
});
Oval.displayName = "Oval";

export interface PolyProps extends PolyFigur {
    style?: React.CSSProperties;
}

export const Poly = React.forwardRef<SVGSVGElement, PolyProps>((props, ref) => {
    const { style, ...shape } = props;
    const polyShape = React.useMemo(() => poly(shape) as FigurDOM, []);

    return elementToJsx(polyShape, null, style, ref);
});

Poly.displayName = "Poly";

export interface StarProps extends PolyFigur {
    style?: React.CSSProperties;
}
export const Star = React.forwardRef<SVGSVGElement, StarProps>((props, ref) => {
    const { style, ...shape } = props;
    const starShape = React.useMemo(() => star(shape) as FigurDOM, []);

    return elementToJsx(starShape, null, style, ref);
});

Star.displayName = "Star";


export interface RectProps extends RoundRectFigur {
    style?: React.CSSProperties;
}
export const Rect = React.forwardRef<SVGSVGElement, RectProps>((props, ref) => {
    const { style, ...shape } = props;
    const rectShape = React.useMemo(() => rect(shape) as FigurDOM, []);

    return elementToJsx(rectShape, null, style, ref);
});

Rect.displayName = "Rect";

export interface RawProps {
    FigurDOM: FigurDOM;
    style?: React.CSSProperties;
}

export const Raw = React.forwardRef<SVGSVGElement, RawProps>((props, ref) => {
    const rectShape = React.useMemo(() => props.FigurDOM, []);

    return elementToJsx(rectShape, null, props.style, ref);
});

Raw.displayName = "Raw";
