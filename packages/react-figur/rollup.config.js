const builder = require("@daybrush/builder");

const defaultOptions = {
    tsconfig: "tsconfig.build.json",
};

module.exports = builder([{
    ...defaultOptions,
    input: "src/react-figur/index.tsx",
    output: "./dist/figur.esm.js",
    format: "es",
    exports: "named",
},
{
    ...defaultOptions,
    input: "src/react-figur/index.tsx",
    output: "./dist/figur.cjs.js",
    format: "cjs",
    exports: "named",
},
]);
