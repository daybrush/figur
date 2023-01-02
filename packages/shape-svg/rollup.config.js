const  builder = require("@daybrush/builder");

const external = {
    "@daybrush/utils": "utils",
}
module.exports = builder([
    {
        input: 'src/index.ts',
        output: "./dist/shape-svg.esm.js",
        format: "es",
        exports: "named",
        external,
    },
    {
        input: 'src/index.ts',
        output: "./dist/shape-svg.cjs.js",
        format: "cjs",
        exports: "named",
        external,
    },
    {
        name: "Shape",
        input: "src/index.umd.ts",
        output: "./dist/shape-svg.js",
        resolve: true,
    },
    {
        name: "Shape",
        input: "src/index.umd.ts",
        output: "./dist/shape-svg.min.js",
        resolve: true,
        uglify: true,
        visualizer: {},
    }
]);
