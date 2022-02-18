import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import { defineConfig } from "rollup";

const baseConfig = defineConfig({
  input: "src/datum.ts",
  plugins: [typescript(), terser()],
});

export default defineConfig([
  {
    ...baseConfig,
    output: {
      file: "dist/datum.cjs.js",
      format: "cjs",
    },
  },
  {
    ...baseConfig,
    output: {
      file: "dist/datum.es.js",
      format: "es",
    },
  },
]);
