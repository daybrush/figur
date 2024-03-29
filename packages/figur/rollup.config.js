const  builder = require("@daybrush/builder");

const external = {
    "@daybrush/utils": "utils",
}
module.exports = builder([
    {
        input: 'src/index.ts',
        output: "./dist/figur.esm.js",
        format: "es",
        exports: "named",
        external,
    },
    {
        input: 'src/index.ts',
        output: "./dist/figur.cjs.js",
        format: "cjs",
        exports: "named",
        external,
    },
    {
        name: "Figur",
        input: "src/index.umd.ts",
        output: "./dist/figur.js",
        resolve: true,
    },
    {
        name: "Figur",
        input: "src/index.umd.ts",
        output: "./dist/figur.min.js",
        resolve: true,
        uglify: true,
        visualizer: {},
    }
]);
