<script lang="ts">
    import { onMount } from "svelte";
    import Figur from "$lib/Figur.svelte";
    import { Star } from "$lib/figures.js";
    import { star } from "figur";

    let svg!: SVGSVGElement;

    onMount(() => {
        console.log(svg);
    });
</script>

<div>
    <Star
        className="aaaa"
        side={3}
        strokeWidth={7}
        width={100}
        strokeLinejoin={"bevel"}
        stroke={"#f55"}
    />
</div>
