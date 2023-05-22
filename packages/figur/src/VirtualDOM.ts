import { camelize, getKeys, splitText } from "@daybrush/utils";

export interface FigurDOM {
    tagName: string;
    setAttribute(name: string, value: string): void;
    getAttribute(name: string): string | null;
    appendChild<T extends Node>(node: T): T;
    appendChild<T extends FigurDOM>(node: T): T;
    children: {
        [index: number]: FigurDOM;
        length: number;
    };
    className: string;
    attributes: FigurAttributes;
    style?: {
        cssText: string;
        item(index: number): string;
        getPropertyValue(name: string): string;
        [index: number]: string;
        readonly length: number;
    };
}

export interface FigurAttr {
    name: string;
    value: string;
}

export interface FigurAttributes {
    item(number: number): FigurAttr | null;
    length: number;
    [index: number]: FigurAttr;
}


function splitStyle(str: string) {
    const properties = splitText(str, ";");
    const obj: Record<string, string> = {};
    const totalLength = properties.length;
    let length = totalLength;

    for (let i = 0; i < totalLength; ++i) {
        const matches = splitText(properties[i], ":");

        if (matches.length < 2 || !matches[1]) {
            --length;
            continue;
        }
        obj[camelize(matches[0].trim())] = matches[1].trim();
    }
    return {
        styles: obj,
        length
    };
}


export function createVirtualDOM(tagName: string): FigurDOM {
    const attrs: FigurAttr[] = [];
    const attributeMap: Record<string, FigurAttr> = {};
    const attributes: FigurAttributes = {
        item(index: number): FigurAttr | null {
            return attrs[index] || null;
        },
        get length() {
            return attrs.length;
        },
    };

    let styles: Record<string, string> = {};
    let keys: string[] = [];

    const style: FigurDOM["style"] = {
        get length() {
            return keys.length;
        },
        getPropertyValue(name: string) {
            return styles[name];
        },
        item(index: number) {
            return styles[keys[index]];
        },
        get cssText() {
            return keys.map(key => `${key}: ${styles[key]};`).join("");
        },
        set cssText(text: string) {
            const { styles: nextStyles } = splitStyle(text);

            styles = nextStyles;
            keys = getKeys(styles);
        },
    };
    const children: FigurDOM[] = [];
    return {
        tagName,
        attributes,
        children,
        className: "",
        appendChild(child: FigurDOM) {
            children.push(child);
        },
        getAttribute(name: string) {
            return attributeMap[name]?.value ?? null;
        },
        setAttribute(name: string, value: string) {
            if (!attributeMap[name]) {
                const attr = {
                    name,
                    value,
                };
                attrs.push(attr);
                attributeMap[name] = attr;
            }
            attributeMap[name].value = value;
        },
        style,
    };
}
