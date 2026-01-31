import fs from "node:fs";
import path from "node:path";

const publicDir = path.join(process.cwd(), "public");
const outFile = path.join(publicDir, "gifs.json");

// lee TODO lo que hay en /public
const files = fs.readdirSync(publicDir);

// deja solo .gif y ordena 1,2,3,10 bien
const gifs = files
  .filter((f) => f.toLowerCase().endsWith(".gif"))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

fs.writeFileSync(outFile, JSON.stringify(gifs, null, 2), "utf8");

console.log(`[manifest] public/gifs.json generado con ${gifs.length} gifs`);
