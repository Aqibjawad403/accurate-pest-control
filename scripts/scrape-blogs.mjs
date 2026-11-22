/**
 * Scrape blogs from accuratepestcontrol.ae article Vite chunks.
 * Writes: src/data/blogs.scraped.json
 * Images: public/blogs/*
 *
 * Usage: node scripts/scrape-blogs.mjs
 */
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";
import os from "os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_IMG = path.join(ROOT, "public", "blogs");
const OUT_JSON = path.join(ROOT, "src", "data", "blogs.scraped.json");
const BASE = "https://accuratepestcontrol.ae";
const TMP = path.join(os.tmpdir(), "apc-blogs");

const LISTING = [
  {
    slug: "best-pest-control-company-dubai",
    title: "5 Reasons We’re the Best Pest Control Company in Dubai (2025)",
    alt: "Accurate Pest Control Services LLC team providing best pest control solutions in Dubai",
    excerpt:
      "Looking for the best pest control company in Dubai? Discover 5 proven reasons our expert team, safe treatments, and reliable results set us apart.",
    date: "04/07/2026",
    category: "Pest Control",
    image: "best-pest-control-in-dubai-team-accurate-pest-control-2026-CCb9Dbzt.webp",
    articleChunk: "Article1-Cb-7jebg.js",
  },
  {
    slug: "dubai-municipality-pest-control",
    title: "5 Things You Should Know About Dubai Municipality Pest Control",
    alt: "Accurate Pest Control Services LLC provides Dubai Municipality–approved pest control services across Dubai.",
    excerpt:
      "Learn key secrets of Dubai Municipality pest control and why Dubai Municipality-approved services ensure safe, expert results for your property.",
    date: "05/07/2026",
    category: "Pest Control",
    image: "dubai-municipality-pest-control-guidelines-Ck7wZPau.webp",
    articleChunk: "Article2-CDVi37aS.js",
  },
  {
    slug: "mosquitoes-in-dubai-after-rain",
    title: "Mosquitoes in Dubai After Rain: 4 Safety Tips",
    alt: "Mosquito control in Dubai after rain with important safety tips and prevention guide",
    excerpt:
      "Mosquitoes in Dubai after rain can increase quickly. Learn expert safety tips, prevention methods, and professional guidance for mosquito control treatment if needed.",
    date: "04/07/2026",
    category: "Mosquitoes",
    image: "control-mosquitoes-dubai-after-rain-guide-D8QOAjNZ.webp",
    articleChunk: "Article3-DdpDgskc.js",
  },
  {
    slug: "avoid-dengue-mosquito-bites-dubai",
    title: "Mosquitoes in Dubai: 4 Ways to Avoid Dengue Bites Naturally",
    alt: "Mosquitoes in Dubai prevention tips to avoid dengue bites naturally",
    excerpt:
      "Protect yourself from mosquitoes in Dubai with 4 natural dengue prevention tips. Get expert guidance on mosquito control, repellents, breeding prevention, and safe ways to avoid dengue bites across Dubai.",
    date: "04/07/2026",
    category: "Mosquitoes",
    image: "mosquitoes_in_dubai_dengue_prevention-Btxi7SJQ.webp",
    articleChunk: "Article4-CTYvo-GJ.js",
  },
  {
    slug: "termite-pest-control-dubai",
    title:
      "Complete Guide to Termite Pest Control in Dubai: Detection & Prevention",
    alt: "Termite pest control in Dubai with termite inspection and professional treatment service",
    excerpt:
      "Learn about termite pest control in Dubai, including infestation signs, inspections, prevention tips, and effective treatments.",
    date: "05 June 2026",
    category: "Termites",
    image: "termite_pest_control_dubai_guide-Bb6UJ22W.webp",
    articleChunk: "Article5-W4jKFpee.js",
  },
  {
    slug: "termite-risk-dubai-homes",
    title: "Which Areas in Dubai Homes Are Most at Risk of Termite Attack?",
    alt: "Termite pest control in Dubai with termite inspection and professional treatment service",
    excerpt:
      "Discover which home areas in Dubai are most vulnerable to termites and why termite pest control in Dubai is essential for lasting protection.",
    date: "19 July 2026",
    category: "Termites",
    image: "dubai_homes_most_at_risk_termite_attack-CBjN4kmP.webp",
    articleChunk: "Article6-BEUPLVgL.js",
  },
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          fetchBuffer(new URL(res.headers.location, url).href)
            .then(resolve)
            .catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          res.resume();
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

async function ensureChunk(file) {
  fs.mkdirSync(TMP, { recursive: true });
  const dest = path.join(TMP, file);
  if (!fs.existsSync(dest) || fs.statSync(dest).size < 100) {
    const buf = await fetchBuffer(`${BASE}/assets/${file}`);
    fs.writeFileSync(dest, buf);
  }
  return fs.readFileSync(dest, "utf8");
}

function localImagePath(assetPath) {
  return `/blogs/${path.basename(assetPath)}`;
}

function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/---/g, "—")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function unescapeJs(str) {
  return str
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\`/g, "`")
    .replace(/\\\\/g, "\\")
    .replace(/---/g, "—");
}

function extractBalancedArray(src, startIdx) {
  // startIdx points at '['
  let depth = 0;
  let inStr = null;
  let escaped = false;
  for (let i = startIdx; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === "`" || ch === '"' || ch === "'") {
      inStr = ch;
      continue;
    }
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) return src.slice(startIdx, i + 1);
    }
  }
  throw new Error("Unbalanced array");
}

function buildImgVarMap(src) {
  const map = new Map();
  for (const m of src.matchAll(
    /(?:const|,)\s*([A-Za-z_$][\w$]*)\s*=\s*"(\/assets\/[^"]+\.(?:webp|jpg|jpeg|png))"/g,
  )) {
    map.set(m[1], m[2]);
  }
  // imports: import{B as n}from"./best-pest...js" — resolve via known listing images later
  return map;
}

/** Parse Article1/2 style: VAR=[{id,heading,description,image,alt,subsections}] */
function parseStructuredSections(src, imgVars) {
  const m = src.match(
    /([A-Za-z_$][\w$]*)=\[\{id:"[^"]+",heading:"/,
  );
  if (!m) return null;
  const start = src.indexOf("[{id:", m.index);
  const raw = extractBalancedArray(src, start);

  // Convert JS-ish array to JSON-compatible text
  let jsonish = raw;
  // Replace image:VAR with image:"/assets/..."
  jsonish = jsonish.replace(/image:([A-Za-z_$][\w$]*)/g, (_, v) => {
    const p = imgVars.get(v);
    return p ? `image:"${p}"` : `image:null`;
  });
  // subsections may use image too
  // Convert backticks template strings to JSON strings
  jsonish = jsonish.replace(/`([^`]*)`/g, (_, inner) => {
    const cleaned = stripHtml(unescapeJs(inner));
    return JSON.stringify(cleaned);
  });
  // quoted strings already OK but need to fix trailing commas? none expected
  // keys are unquoted — quote them
  jsonish = jsonish.replace(
    /([{\[,]\s*)([A-Za-z_$][\w$]*)\s*:/g,
    '$1"$2":',
  );
  // undefined/null already fine; remove undefined refs
  jsonish = jsonish.replace(/:\s*null/g, ":null");

  let data;
  try {
    data = JSON.parse(jsonish);
  } catch (err) {
    // Fallback: manual regex parse of each section object
    console.warn("JSON parse failed, using regex fallback:", err.message);
    return parseStructuredByRegex(raw, imgVars);
  }
  return data;
}

function parseStructuredByRegex(raw, imgVars) {
  const sections = [];
  const sectionRe =
    /\{id:"([^"]+)",heading:"([^"]+)",description:(`[^`]*`|"[^"]*"),image:([A-Za-z_$][\w$]*|null|"[^"]*")(?:,alt:"([^"]*)")?,subsections:(\[[\s\S]*?\])\}/g;
  let sm;
  while ((sm = sectionRe.exec(raw))) {
    const descRaw = sm[3];
    const description = stripHtml(
      unescapeJs(
        descRaw.startsWith("`") ? descRaw.slice(1, -1) : descRaw.slice(1, -1),
      ),
    );
    let image = null;
    if (sm[4] && sm[4] !== "null") {
      image = sm[4].startsWith('"')
        ? sm[4].slice(1, -1)
        : imgVars.get(sm[4]) || null;
    }
    const subsections = [];
    const subRe =
      /\{id:"([^"]+)",title:"([^"]+)",text:(`[^`]*`|"[^"]*")(?:,image:([A-Za-z_$][\w$]*|"[^"]*"))?(?:,alt:"([^"]*)")?\}/g;
    let sub;
    const subSrc = sm[6];
    while ((sub = subRe.exec(subSrc))) {
      const text = stripHtml(
        unescapeJs(
          sub[3].startsWith("`") ? sub[3].slice(1, -1) : sub[3].slice(1, -1),
        ),
      );
      let subImg = null;
      if (sub[4]) {
        subImg = sub[4].startsWith('"')
          ? sub[4].slice(1, -1)
          : imgVars.get(sub[4]) || null;
      }
      subsections.push({
        id: sub[1],
        title: unescapeJs(sub[2]),
        paragraphs: text ? [text] : [],
        bullets: [],
        images: subImg
          ? [{ src: localImagePath(subImg), alt: sub[5] || "" }]
          : [],
      });
    }
    // Also capture list items inside subsection text? handled in description
    // Extract bullet lists from description if present as newlines - skip

    const section = {
      id: sm[1],
      title: unescapeJs(sm[2]).replace(/^\d+\.\s*/, ""),
      paragraphs: description ? [description] : [],
      bullets: [],
      images: image
        ? [{ src: localImagePath(image), alt: sm[5] || "" }]
        : [],
      subsections,
    };
    sections.push(section);
  }
  return sections;
}

/** Parse Article3-6 inline JSX content */
function parseJsxSections(src, imgVars, toc) {
  // Find main content region: from first h2 with id: to Leave a Reply / FAQ form
  const startCandidates = [
    src.indexOf('e.jsx("h2",{id:'),
    src.indexOf("e.jsx('h2',{id:"),
  ].filter((i) => i >= 0);
  const start = Math.min(...startCandidates);
  if (!Number.isFinite(start) || start < 0) {
    return [];
  }

  let end = src.indexOf('Leave a Reply', start);
  if (end < 0) end = src.indexOf("Frequently Asked Questions", start);
  if (end < 0) end = src.length;
  const body = src.slice(start, end);

  // Tokenize content pieces
  const tokens = [];
  const tokenRe =
    /e\.jsx\("h2",\{id:"([^"]+)"[^}]*children:"((?:\\.|[^"\\])*)"\}|e\.jsx\("h3",\{id:"([^"]+)"[^}]*children:"((?:\\.|[^"\\])*)"\}|e\.jsx\("p",\{[^}]*children:(?:"((?:\\.|[^"\\])*)"|`([^`]*)`)\}|e\.jsx\("li",\{[^}]*children:(?:"((?:\\.|[^"\\])*)"|`([^`]*)`)\}|e\.jsx\("img",\{[^}]*src:([A-Za-z_$][\w$]*)[^}]*alt:"((?:\\.|[^"\\])*)"[^}]*\}|src:([A-Za-z_$][\w$]*),alt:"((?:\\.|[^"\\])*)"/g;

  let m;
  while ((m = tokenRe.exec(body))) {
    if (m[1] != null) {
      tokens.push({
        type: "h2",
        id: m[1],
        text: unescapeJs(m[2]),
      });
    } else if (m[3] != null) {
      tokens.push({
        type: "h3",
        id: m[3],
        text: unescapeJs(m[4]),
      });
    } else if (m[5] != null || m[6] != null) {
      const raw = m[5] != null ? m[5] : m[6];
      const text = stripHtml(unescapeJs(raw));
      if (text) tokens.push({ type: "p", text });
    } else if (m[7] != null || m[8] != null) {
      const raw = m[7] != null ? m[7] : m[8];
      const text = stripHtml(unescapeJs(raw));
      if (text) tokens.push({ type: "li", text });
    } else if (m[9] != null) {
      const p = imgVars.get(m[9]);
      if (p)
        tokens.push({
          type: "image",
          src: p,
          alt: unescapeJs(m[10] || ""),
        });
    } else if (m[11] != null) {
      const p = imgVars.get(m[11]);
      if (p)
        tokens.push({
          type: "image",
          src: p,
          alt: unescapeJs(m[12] || ""),
        });
    }
  }

  // Also catch e.jsxs("h2"... patterns and children with JSX fragments - simplified above covers most

  const sections = [];
  let current = null;
  let currentSub = null;

  const target = () => currentSub || current;

  for (const tok of tokens) {
    if (tok.type === "h2") {
      if (/faq|frequently/i.test(tok.id) || /faq/i.test(tok.text)) continue;
      currentSub = null;
      current = {
        id: tok.id,
        title: tok.text.replace(/^\d+\.\s*/, ""),
        paragraphs: [],
        bullets: [],
        images: [],
        subsections: [],
      };
      sections.push(current);
      continue;
    }
    if (tok.type === "h3") {
      if (!current) continue;
      currentSub = {
        id: tok.id,
        title: tok.text,
        paragraphs: [],
        bullets: [],
        images: [],
      };
      current.subsections.push(currentSub);
      continue;
    }
    const t = target();
    if (!t) continue;
    if (tok.type === "p") t.paragraphs.push(tok.text);
    else if (tok.type === "li") t.bullets.push(tok.text);
    else if (tok.type === "image") {
      t.images.push({ src: localImagePath(tok.src), alt: tok.alt });
    }
  }

  // If TOC provided and sections empty-ish, still return what we have
  if (!sections.length && toc?.length) {
    // nothing
  }
  return sections;
}

function parseToc(src) {
  const m = src.match(/\[\{label:"[^"]+",id:"/);
  if (!m) return [];
  const start = m.index;
  try {
    const raw = extractBalancedArray(src, start);
    let jsonish = raw.replace(/([{\[,]\s*)([A-Za-z_$][\w$]*)\s*:/g, '$1"$2":');
    return JSON.parse(jsonish);
  } catch {
    return [];
  }
}

function resolveImportImages(src, imgVars) {
  // import{B as n}from"./file.js" or import{a as S}from"./file.js"
  // Download and parse those tiny image modules
  return imgVars;
}

async function loadImageModules(src, imgVars) {
  const imports = [
    ...src.matchAll(
      /import\{([^}]+)\}from"\.\/([^"]+\.js)"/g,
    ),
  ];
  for (const imp of imports) {
    const spec = imp[1];
    const file = imp[2];
    if (
      !/webp|pest|mosquito|termite|dubai|control|dengue|municipality|spray|eco|licensed|affordable|service|guide|prevention|risk|homes|repellent|breeding|zones/i.test(
        file,
      ) &&
      !file.includes("best-pest") &&
      !file.includes("mosquito") &&
      !file.includes("termite") &&
      !file.includes("dubai")
    ) {
      // still try image modules that are small
    }
    try {
      const mod = await ensureChunk(file);
      // const x="/assets/.."; export{x as B}
      const assigns = [
        ...mod.matchAll(
          /(?:const|,)\s*([A-Za-z_$][\w$]*)\s*=\s*"(\/assets\/[^"]+)"/g,
        ),
      ];
      const exports = [
        ...mod.matchAll(
          /export\{([^}]+)\}/,
        ),
      ];
      // Map local names in module
      const local = new Map(assigns.map((a) => [a[1], a[2]]));
      // Parse import { B as n, a as S }
      for (const part of spec.split(",")) {
        const bits = part.trim().split(/\s+as\s+/);
        const exported = bits[0].trim();
        const localName = (bits[1] || bits[0]).trim();
        // Find export { s as B, t as a }
        if (exports[0]) {
          for (const ep of exports[0][1].split(",")) {
            const eb = ep.trim().split(/\s+as\s+/);
            const from = eb[0].trim();
            const as = (eb[1] || eb[0]).trim();
            if (as === exported || from === exported) {
              const pathVal = local.get(from);
              if (pathVal) imgVars.set(localName, pathVal);
            }
          }
        }
        // Also direct: export { o as B } where o is const
        for (const a of assigns) {
          // export{o as B}
          if (exports[0]?.[1].includes(a[1])) {
            // handled above
          }
        }
      }
      // Simpler: any /assets/ in module — if only one, map all import aliases to it;
      // if multiple, use export map
      if (assigns.length === 1) {
        for (const part of spec.split(",")) {
          const bits = part.trim().split(/\s+as\s+/);
          const localName = (bits[1] || bits[0]).trim();
          imgVars.set(localName, assigns[0][2]);
        }
      } else if (exports[0]) {
        for (const part of spec.split(",")) {
          const bits = part.trim().split(/\s+as\s+/);
          const exported = bits[0].replace(/^type\s+/, "").trim();
          const localName = (bits[1] || bits[0]).trim();
          for (const ep of exports[0][1].split(",")) {
            const eb = ep.trim().split(/\s+as\s+/);
            const from = eb[0].trim();
            const asName = (eb[1] || eb[0]).trim();
            if (asName === exported) {
              const pathVal = local.get(from);
              if (pathVal) imgVars.set(localName, pathVal);
            }
          }
        }
      }
    } catch {
      // ignore non-image modules
    }
  }
  return imgVars;
}

async function downloadImage(assetPath) {
  const name = path.basename(assetPath);
  const dest = path.join(OUT_IMG, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) return name;
  const url = `${BASE}${assetPath.startsWith("/") ? "" : "/"}${assetPath}`;
  try {
    const buf = await fetchBuffer(url);
    fs.writeFileSync(dest, buf);
    console.log("img", name, buf.length);
    return name;
  } catch (err) {
    console.warn("fail", name, err.message);
    return null;
  }
}

function sectionsToToc(sections) {
  return sections.map((s) => ({
    id: s.id,
    title: s.title,
    sub: (s.subsections || []).map((sub) => ({
      id: sub.id,
      label: sub.title,
    })),
  }));
}

async function main() {
  fs.mkdirSync(OUT_IMG, { recursive: true });
  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });

  const posts = [];
  const allImages = new Set();

  for (const item of LISTING) {
    console.log("\n===", item.slug);
    const src = await ensureChunk(item.articleChunk);
    for (const m of src.matchAll(/\/assets\/[^"']+\.(?:webp|jpg|jpeg|png)/g)) {
      allImages.add(m[0]);
    }
    allImages.add(`/assets/${item.image}`);

    let imgVars = buildImgVarMap(src);
    imgVars = await loadImageModules(src, imgVars);
    console.log("  imgVars", [...imgVars.entries()].slice(0, 8));

    let sections = parseStructuredSections(src, imgVars);
    if (sections && !Array.isArray(sections)) {
      // shouldn't happen
      sections = null;
    }
    // parseStructuredSections may return parsed JSON objects with different shape
    if (Array.isArray(sections) && sections.length && sections[0].heading) {
      sections = sections.map((s) => ({
        id: s.id,
        title: String(s.heading || "").replace(/^\d+\.\s*/, ""),
        paragraphs: s.description
          ? [stripHtml(String(s.description))]
          : [],
        bullets: [],
        images: s.image
          ? [
              {
                src: localImagePath(s.image),
                alt: s.alt || "",
              },
            ]
          : [],
        subsections: (s.subsections || []).map((sub) => ({
          id: sub.id,
          title: sub.title,
          paragraphs: sub.text ? [stripHtml(String(sub.text))] : [],
          bullets: Array.isArray(sub.bullets) ? sub.bullets : [],
          images: sub.image
            ? [{ src: localImagePath(sub.image), alt: sub.alt || "" }]
            : [],
        })),
      }));
    }

    if (!sections || !sections.length) {
      const toc = parseToc(src);
      sections = parseJsxSections(src, imgVars, toc);
    }

    console.log("  sections", sections?.length || 0);

    // Collect images from sections
    for (const s of sections || []) {
      for (const img of s.images || []) allImages.add(`/assets/${path.basename(img.src)}`);
      for (const sub of s.subsections || []) {
        for (const img of sub.images || [])
          allImages.add(`/assets/${path.basename(img.src)}`);
      }
    }

    const introSection = (sections || []).find(
      (s) => /intro/i.test(s.id) || /^introduction$/i.test(s.title),
    );
    const intro =
      introSection?.paragraphs?.[0] || item.excerpt;

    posts.push({
      slug: item.slug,
      title: item.title.trim(),
      cardTitle: item.title.trim(),
      excerpt: item.excerpt,
      date: item.date,
      category: item.category,
      image: `/blogs/${item.image}`,
      imageAlt: item.alt,
      intro,
      featuredImage: `/blogs/${item.image}`,
      toc: sectionsToToc(sections || []),
      sections: sections || [],
    });
  }

  for (const img of allImages) {
    await downloadImage(img);
  }

  const categories = [
    "Pest Control",
    "Mosquitoes",
    "Termites",
    "Ants",
    "Cockroaches",
    "Bed Bugs",
    "Rodents",
    "Flies",
    "Spiders",
    "Birds",
  ];
  const tags = [
    "Ants",
    "Cockroaches",
    "Bed Bugs",
    "Rodents",
    "Flies",
    "Mosquitoes",
    "Spiders",
    "Termites",
    "Venomous",
    "Birds",
    "Pest Control",
  ];

  fs.writeFileSync(
    OUT_JSON,
    JSON.stringify(
      { posts, categories, tags, scrapedAt: new Date().toISOString() },
      null,
      2,
    ),
  );
  console.log("\nWrote", OUT_JSON);
  for (const p of posts) {
    console.log(
      `- ${p.slug}: ${p.sections.length} sections, intro ${p.intro.slice(0, 60)}...`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
