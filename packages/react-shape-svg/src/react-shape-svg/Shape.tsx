/* eslint-disable react-hooks/exhaustive-deps */

import { camelize } from "@daybrush/utils";
import * as React from "react";
import { oval, OvalShape, poly, PolyShape, rect, RoundRectShape, ShapeDOM, star } from "shape-svg";

function elementToJsx(
    element: ShapeDOM,
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

        (style as any)[name] = elementStyle.getPropertyValue(name);
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

export interface OvalProps extends OvalShape {
    style?: React.CSSProperties;
}

export const Oval = React.forwardRef<SVGSVGElement, OvalProps>((props, ref) => {
    const ovalShape = React.useMemo(() => oval(props) as ShapeDOM, []);

    return elementToJsx(ovalShape, null, props.style, ref);
});
Oval.displayName = "Oval";
export interface PolyProps extends PolyShape {

}

export const Poly = React.forwardRef<SVGSVGElement, PolyProps>((props, ref) => {
    const polyShape = React.useMemo(() => poly(props) as ShapeDOM, []);

    return elementToJsx(polyShape, null, props.style, ref);
});

Poly.displayName = "Poly";

export interface StarProps extends PolyShape {
    style?: React.CSSProperties;
}
export const Star = React.forwardRef<SVGSVGElement, StarProps>((props, ref) => {
    const starShape = React.useMemo(() => star(props) as ShapeDOM, []);

    return elementToJsx(starShape, null, props.style, ref);
});

Star.displayName = "Star";


export interface RectProps extends RoundRectShape {
    style?: React.CSSProperties;
}
export const Rect = React.forwardRef<SVGSVGElement, RectProps>((props, ref) => {
    const rectShape = React.useMemo(() => rect(props) as ShapeDOM, []);

    return elementToJsx(rectShape, null, props.style, ref);
});

Rect.displayName = "Rect";

export interface RawProps {
    shapeDOM: ShapeDOM;
    style?: React.CSSProperties;
}

export const Raw = React.forwardRef<SVGSVGElement, RawProps>((props, ref) => {
    const rectShape = React.useMemo(() => props.shapeDOM, []);

    return elementToJsx(rectShape, null, props.style, ref);
});

Raw.displayName = "Raw";
