import { build } from "esbuild";

const b = () =>
  build({
    bundle: true,
    entryPoints: ["./server/index.ts"],
    banner: {
      js: "#!/usr/bin/env node",
    },
    platform: "node",
    outfile: "dist/server.cjs",
    format: "cjs",
    minify: true,
  });

Promise.all([b()]);
