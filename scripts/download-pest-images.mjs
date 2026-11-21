/**
 * Download pest images from accuratepestcontrol.ae into public/pests/
 *
 * Usage:
 *   node scripts/download-pest-images.mjs
 *   node scripts/download-pest-images.mjs --only=ants,cockroaches
 */
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";
import os from "os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_ROOT = path.join(ROOT, "public", "pests");
const BASE = "https://accuratepestcontrol.ae";
const CHUNK_DIR = path.join(os.tmpdir(), "apc-pests");

const CHUNK_FILES = {
  ants: "Ant-BediD1mj.js",
  cockroaches: "cockroch-BZjxnB8-.js",
  bedbugs: "RedBug-aMtb2TBc.js",
  rodents: "Rodent-Bukewdk6.js",
  flies: "Flies-BOSYP2r-.js",
  mosquitoes: "Mosquito-CKe-a4va.js",
  spiders: "Spider-Cvr9dwnh.js",
  termites: "Termites-BGCV3lxP.js",
  venomous: "Venomous-L7AlJuuh.js",
  birds: "Bird-BT1hdkXS.js",
  lizards: "Lizard-BgV4-QZ8.js",
  ticks: "Tick-CLaDp_4D.js",
  earwig: "earwig-DdwuV3C3.js",
  wasps: "Wasp-LNXuFvRg.js",
  fumigation: "fumigation-ub-lKVG8.js",
};

const HERO_FALLBACKS = {
  ants: "/heroes/routes/ant.webp",
  cockroaches: "/heroes/routes/cockroach.webp",
  bedbugs: "/heroes/routes/bedbug.webp",
  rodents: "/heroes/routes/rodents.webp",
  flies: "/heroes/routes/flies.webp",
  mosquitoes: "/heroes/routes/mosquito.webp",
  spiders: "/heroes/routes/spider.webp",
  termites: "/heroes/routes/termites.webp",
  venomous: "/heroes/routes/snake.webp",
  birds: "/heroes/routes/bird.webp",
  lizards: "/heroes/routes/lizard.webp",
  ticks: "/heroes/routes/tick.webp",
  earwig: "/heroes/routes/earwig.webp",
  wasps: "/heroes/routes/wasp.webp",
  fumigation: "/heroes/routes/fumigation.webp",
};

function extractPathsFromChunk(src) {
  const paths = [
    ...src.matchAll(
      /["'`](\/(?:assets|heroes|Pests)\/[^"'`]+\.(?:webp|jpg|jpeg|png))["'`]/g,
    ),
  ].map((m) => m[1]);
  return [...new Set(paths)];
}

function ensureChunks() {
  fs.mkdirSync(CHUNK_DIR, { recursive: true });
  const missing = Object.entries(CHUNK_FILES).filter(
    ([, file]) => !fs.existsSync(path.join(CHUNK_DIR, file)),
  );
  return missing;
}

async function downloadChunk(file) {
  const url = `${BASE}/assets/${file}`;
  const dest = path.join(CHUNK_DIR, file);
  const buf = await fetchBuffer(url);
  fs.writeFileSync(dest, buf);
}

function cleanName(urlPath) {
  // Keep vite content-hash in the filename so similar names don't collide
  // e.g. Close-Up_of_X-AbCd1234.webp stays unique.
  return path.basename(decodeURIComponent(urlPath.split("?")[0]));
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; AccuratePestLocalImageDownloader/1.0)",
          Accept: "image/*,*/*",
        },
      },
      (res) => {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          const next = new URL(res.headers.location, url).toString();
          res.resume();
          fetchBuffer(next).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      },
    );
    req.on("error", reject);
  });
}

async function downloadOne(relPath, destDir) {
  const url = relPath.startsWith("http") ? relPath : `${BASE}${relPath}`;
  const fileName = cleanName(relPath);
  const dest = path.join(destDir, fileName);

  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    return { skipped: true, exists: true, fileName, dest };
  }

  const buf = await fetchBuffer(url);
  fs.writeFileSync(dest, buf);
  return { skipped: false, fileName, bytes: buf.length, dest };
}

async function main() {
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  const only = onlyArg
    ? onlyArg
        .slice("--only=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : null;

  const pests = Object.keys(CHUNK_FILES).filter(
    (k) => !only || only.includes(k),
  );

  const missing = ensureChunks().filter(([pest]) => pests.includes(pest));
  if (missing.length) {
    console.log(`Fetching ${missing.length} missing JS chunks...`);
    for (const [, file] of missing) {
      process.stdout.write(`  chunk ${file}... `);
      await downloadChunk(file);
      console.log("ok");
    }
  }

  fs.mkdirSync(OUT_ROOT, { recursive: true });

  let ok = 0;
  let fail = 0;
  let skip = 0;
  const manifest = {};

  for (const pest of pests) {
    const chunkPath = path.join(CHUNK_DIR, CHUNK_FILES[pest]);
    const src = fs.readFileSync(chunkPath, "utf8");
    const paths = extractPathsFromChunk(src);
    if (HERO_FALLBACKS[pest] && !paths.includes(HERO_FALLBACKS[pest])) {
      paths.push(HERO_FALLBACKS[pest]);
    }

    const destDir = path.join(OUT_ROOT, pest);
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`\n=== ${pest} (${paths.length} images) ===`);
    manifest[pest] = [];

    for (const rel of paths) {
      try {
        const result = await downloadOne(rel, destDir);
        const local = `/pests/${pest}/${result.fileName}`;
        manifest[pest].push({ source: rel, local });
        if (result.skipped) {
          skip += 1;
          console.log(`  skip  ${result.fileName}`);
        } else {
          ok += 1;
          console.log(
            `  ok    ${result.fileName} (${Math.round(result.bytes / 1024)} KB)`,
          );
        }
      } catch (err) {
        fail += 1;
        console.log(`  FAIL  ${rel} -> ${err.message}`);
      }
    }
  }

  const manifestPath = path.join(OUT_ROOT, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\nDone. ok=${ok} skip=${skip} fail=${fail}`);
  console.log(`Saved under: ${OUT_ROOT}`);
  console.log(`Manifest: ${manifestPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
