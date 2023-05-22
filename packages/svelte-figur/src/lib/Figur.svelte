<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
    import { star } from "figur";
    import type { Figur, PolyFigur } from "figur";

    export let svg: SVGSVGElement | undefined = undefined;

    interface $$Props extends PolyFigur, Omit<SVGAttributes<SVGSVGElement>, keyof PolyFigur> {
        svg?: SVGSVGElement | undefined;
        figurFunc?: (figur:  Figur) => SVGElement;
    }
    let attributes: Record<string, any> = {};
    let html = "";

    $: {
        const {
            figurFunc,
            ...rest
        } = $$props;
        const el = figurFunc(rest);
        const nodeMap = el.attributes;
        const length = nodeMap.length;

        for (let i = 0; i < length; ++i) {
            const item = nodeMap.item(i)!;

            attributes[item.name] = item.value;
        }
        html = el.innerHTML;
    }
    
</script>
<svg {...attributes} bind:this={svg}>{@html html}</svg>
