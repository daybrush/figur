import typescript from 'rollup-plugin-typescript';
import PrototypeMinify from "rollup-plugin-prototype-minify";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import { uglify } from "rollup-plugin-uglify";

const pkg = require("./package.json");
const banner = require("./config/banner");
const merge = require("./config/merge");
const plugin = typescript({
  "module": "es2015",
  "target": "es3",
  "lib": ["es2015", "dom"],
  "exclude": "node_modules/**",
  "sourceMap": true,
});
const uglifyCode = uglify({
  sourcemap: true,
  output: {
    comments: function (node, comment) {
      var text = comment.value;
      var type = comment.type;
      if (type === "comment2") {
        // multiline comment
        return /name:\sshape-svg/.test(text);
      }
    },
  },
});
const defaultConfig = {
  plugins: [
    plugin,
    replace({
      "#__VERSION__#": pkg.version,
      "/** @class */": "/*#__PURE__*/",
      delimiters: ["", ""],
    }),
    PrototypeMinify({ sourcemap: true })
  ],
  output: {
    banner,
    format: "es",
    freeze: false,
    exports: "named",
    interop: false,
    sourcemap: true,
  },
};

export default [
  {
    input: 'src/index.umd.ts',
    plugins: [resolve()],
    output: {
      format: "umd",
      name: "Shape",
      exports: "default",
      file: `./dist/shape.js`,
    },
  }, {
    input: 'src/index.umd.ts',
    plugins: [resolve(), uglifyCode],
    output: {
      format: "umd",
      name: "Shape",
      exports: "default",
      file: `./dist/shape.min.js`,
    },
  }
].map(entry => merge(defaultConfig, entry, {
  plugins: "append",
  output: "append",
}));
