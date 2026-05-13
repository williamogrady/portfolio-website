import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

const dist = resolve("dist");

copyFileSync(resolve(dist, "index.html"), resolve(dist, "404.html"));
