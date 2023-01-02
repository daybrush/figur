const builder = require("@daybrush/builder");

const defaultOptions = {
    tsconfig: "tsconfig.build.json",
};

module.exports = builder([{
    ...defaultOptions,
    input: "src/react-shape-svg/index.tsx",
    output: "./dist/shape-svg.esm.js",
    format: "es",
    exports: "named",
},
{
    ...defaultOptions,
    input: "src/react-shape-svg/index.tsx",
    output: "./dist/shape-svg.cjs.js",
    format: "cjs",
    exports: "named",
},
]);
