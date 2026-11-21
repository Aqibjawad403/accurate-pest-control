/**
 * Download type-detail pages from accuratepestcontrol.ae and extract
 * PestInfoPage props into a JSON file for splicing into pest-services.ts
 */
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import os from "os";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(os.tmpdir(), "apc-types");
const OUT_JSON = path.join(OUT_DIR, "types-extracted.json");
const BASE = "https://accuratepestcontrol.ae";

/** Maps our display names → live site slug */
const TYPE_SLUGS = {
  "ARGENTINE ANTS": "argentine-ant",
  "PAVEMENT ANTS": "pavement-ant",
  "PHARAOH ANTS": "pharaoh-ant",
  "CARPENTER ANTS": "carpenter-ant",
  "GERMAN COCKROACH": "german-cockroach",
  "BROWN-BANDED COCKROACH": "brown-banded-cockroach",
  "SMOKY BROWN COCKROACH": "smoky-brown-cockroach",
  "ORIENTAL COCKROACH": "oriental-cockroach",
  "CIMEX LECTULARIUS": "cimex-lectularius",
  "CIMEX HEMIPTERUS": "cimex-hemipterus",
  "BAT BUGS": "bat-bug",
  "HOUSE MOUSE": "house-mouse",
  "ROOF RAT": "roof-rat",
  "BANDICOOT RAT": "bandicoot-rat",
  "NORWAY RAT": "norway-rat",
  "HOUSE FLY": "housefly",
  "CLUSTER FLY": "clusterfly",
  "FRUIT FLY": "fruitfly",
  "AEDES MOSQUITO": "aedes-mosquito",
  "ANOPHELES MOSQUITO": "anopheles-mosquito",
  "CULEX MOSQUITO": "culex-mosquito",
  "HOUSE SPIDER": "house-spider",
  "JUMPING SPIDER": "jumping-spider",
  "BLACK WIDOW SPIDER": "black-widow-spider",
  "SUBTERRANEAN TERMITES": "subterranean-termites",
  "DRYWOOD TERMITES": "drywood-termites",
  "FORMOSAN TERMITES": "formosan-termites",
  "DAMPWOOD TERMITES": "dampwood-termites",
  "ARABIAN COBRA": "arabian-cobra",
  "SAND BOA": "sand-boa",
  "ARABIAN HORNED VIPER": "arabian-horned-viper",
  "COMMON MYNA": "common-myna",
  "HOUSE SPARROW": "house-sparrow",
  PIGEONS: "pigeons",
  "HOUSE GECKO": "house-gecko",
  "MEDITERRANEAN GECKO": "mediterranean-gecko",
  "YELLOW-BELLIED HOUSE GECKO": "yellow-bellied-house-gecko",
  "DEER TICK": "deer-tick",
  "LONE STAR TICK": "lone-star-tick",
  "BROWN DOG TICK": "brown-dog-tick",
  "EUROPEAN EARWIG": "european-earwig",
  "DESERT EARWIG": "desert-earwig",
  "PERISSIA EARWIG": "perissia-earwig",
  "PAPER WASP NEST": "paper-wasp-nest",
  "YELLOW JACKET WASP": "yellow-jacket-wasp",
  "HORNEST WASP": "hornet-wasp",
  "ARABIAN PAPER WASP": "arabian-paper-wasp",
  // Fumigation subtypes may not have dedicated pages — skip if 404
  "RESIDENTIAL FUMIGATION": "fumigation",
  "COMMERCIAL FUMIGATION": "fumigation",
  "WAREHOUSE FUMIGATION": "fumigation",
  "CONTAINER FUMIGATION": "fumigation",
};

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          const next = res.headers.location.startsWith("http")
            ? res.headers.location
            : new URL(res.headers.location, url).href;
          return fetchText(next).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          res.resume();
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve(Buffer.concat(chunks).toString("utf8")),
        );
      })
      .on("error", reject);
  });
}

function unescapeJsString(s) {
  return s
    .replace(/\\n/g, "\n")
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\")
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) =>
      String.fromCharCode(parseInt(h, 16)),
    );
}

function extractStringProp(src, key) {
  const re = new RegExp(`${key}:"((?:\\\\.|[^"\\\\])*)"`);
  const m = src.match(re);
  return m ? unescapeJsString(m[1]).trim() : "";
}

function extractValueList(src, key) {
  const re = new RegExp(`${key}:\\[([\\s\\S]*?)\\]`);
  const m = src.match(re);
  if (!m) return [];
  const values = [];
  const valueRe = /value:"((?:\\.|[^"\\])*)"/g;
  let vm;
  while ((vm = valueRe.exec(m[1]))) {
    values.push(unescapeJsString(vm[1]).trim());
  }
  return values.filter(Boolean);
}

function extractPestInfoProps(chunk) {
  // PestInfoPage props start at title:"About ...
  const start = chunk.indexOf('title:"About');
  const altStart = chunk.indexOf("title:`About");
  let i = start >= 0 ? start : altStart;
  if (i < 0) {
    // Some pages may use different title prefixes
    const idx = chunk.search(/title:"[^"]{3,80}"/);
    if (idx < 0) return null;
    i = idx;
  }

  // Take a generous slice of the props object
  const slice = chunk.slice(i, i + 8000);

  return {
    headline: extractStringProp(slice, "title"),
    description: extractStringProp(slice, "description"),
    signsHeading: extractStringProp(slice, "Heading1"),
    signsIntro: extractStringProp(slice, "desc1"),
    signs: extractValueList(slice, "pestDescription"),
    nestHeading: extractStringProp(slice, "Heading2"),
    nestIntro: extractStringProp(slice, "desc2"),
    nestListIntro: extractStringProp(slice, "ListDesc2"),
    nestItems: extractValueList(slice, "List2"),
    nestOutro: extractStringProp(slice, "Enddesc2"),
    dangersHeading: extractStringProp(slice, "Heading3"),
    dangersIntro: extractStringProp(slice, "desc3"),
    dangers: extractValueList(slice, "List3"),
    solutionsHeading: extractStringProp(slice, "Heading4"),
    solutionsIntro: extractStringProp(slice, "desc4"),
    solutions: extractValueList(slice, "List4"),
    ctaHeading: extractStringProp(slice, "Heading5"),
    ctaIntro: extractStringProp(slice, "desc5"),
    ctaBody: extractStringProp(slice, "Enddesc5"),
  };
}

function findChunkUrl(html) {
  const m = html.match(/href="(\/assets\/[^"]+\.js)"/);
  // Prefer the page-specific chunk (not vendor/index)
  const all = [...html.matchAll(/href="(\/assets\/[^"]+\.js)"/g)].map(
    (x) => x[1],
  );
  const pageChunk = all.find(
    (u) =>
      !/vendor|index-|TopBar|Footer|SEO|ServicesHero|PestInfoPage/i.test(u),
  );
  return pageChunk || m?.[1] || null;
}

async function extractOne(name, slug) {
  const pageUrl = `${BASE}/${slug}/`;
  const html = await fetchText(pageUrl);
  const chunkPath = findChunkUrl(html);
  if (!chunkPath) throw new Error(`No chunk for ${slug}`);
  const chunkUrl = chunkPath.startsWith("http")
    ? chunkPath
    : `${BASE}${chunkPath}`;
  const chunk = await fetchText(chunkUrl);
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.js`), chunk);
  const props = extractPestInfoProps(chunk);
  if (!props || !props.headline) {
    throw new Error(`Could not parse props for ${slug}`);
  }
  return { name, slug, ...props };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const results = {};
  const fumigationShared = new Set();

  for (const [name, slug] of Object.entries(TYPE_SLUGS)) {
    // Fumigation subtypes share one page — extract once
    if (slug === "fumigation" && fumigationShared.has(slug)) {
      results[name] = {
        ...results["RESIDENTIAL FUMIGATION"],
        name,
        slug,
      };
      continue;
    }

    process.stdout.write(`Fetching ${slug}... `);
    try {
      const data = await extractOne(name, slug);
      results[name] = data;
      if (slug === "fumigation") fumigationShared.add(slug);
      console.log("ok:", data.headline.slice(0, 40));
    } catch (err) {
      console.log("FAIL:", err.message);
      results[name] = { name, slug, error: err.message };
    }
  }

  fs.writeFileSync(OUT_JSON, JSON.stringify(results, null, 2));
  console.log(`\nWrote ${OUT_JSON}`);
  const ok = Object.values(results).filter((r) => !r.error).length;
  const fail = Object.values(results).filter((r) => r.error).length;
  console.log(`Success: ${ok}, Failed: ${fail}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
