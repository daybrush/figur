import type { Figur } from "figur";
import SvelteFigur from "./Figur.svelte";
import type { SvelteComponentTyped } from "svelte/internal";
import type { SVGAttributes } from "svelte/elements";

export function makeFigur<T extends Figur>(figurFunc: (figur: T) => SVGElement) {
    let svelteFigur: typeof SvelteComponentTyped<Partial<T & Omit<SVGAttributes<SVGSVGElement>, keyof T>>>;
    if (typeof SvelteFigur === "object") {
        svelteFigur = {
            ...SvelteFigur,
            render: (...attrs: any[]) => {
                return SvelteFigur.render(...attrs);
            },
            $$render: (...attrs: any[]) => {
                attrs[1] = {
                    ...attrs[1],
                    figurFunc,
                };
                return SvelteFigur.$$render(...attrs);
            },
        };
    } else {
        svelteFigur = class SvelteStar extends SvelteFigur {
            constructor(options: any) {
                options.props.figurFunc = figurFunc;
                super(options);
            }
        } as any;
    }

    return svelteFigur;
}
