import fs from "fs";
import os from "os";
import path from "path";

const s = fs.readFileSync(
  path.join(os.tmpdir(), "apc-types", "argentine.js"),
  "utf8",
);
const i = s.indexOf('title:"About');
console.log(s.slice(i, i + 4000));
