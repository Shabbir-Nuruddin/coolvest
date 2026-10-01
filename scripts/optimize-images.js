const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "..", "assets", "raw");
const outDir = path.join(__dirname, "..", "public", "product");

const APPROVED = ["security-worker", "layer-board"];

const MAX_W = 1600;

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const rows = [];
  for (const f of fs.readdirSync(srcDir)) {
    if (!f.endsWith(".png")) continue;
    const src = path.join(srcDir, f);
    const base = f.replace(/\.png$/, "");
    const before = fs.statSync(src).size;

    const meta = await sharp(src).metadata();
    const width = Math.min(MAX_W, meta.width);
    const scale = width / meta.width;
    const height = Math.round(meta.height * scale);

    const raw = path.join(srcDir, base + ".webp");
    await sharp(src)
      .resize(width, height, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(raw);

    let served = false;
    if (APPROVED.includes(base)) {
      fs.copyFileSync(raw, path.join(outDir, base + ".webp"));
      served = true;
    }

    const after = fs.statSync(raw).size;
    rows.push({
      file: base + ".webp",
      dims: `${width}x${height}`,
      beforeKB: Math.round(before / 1024),
      afterKB: Math.round(after / 1024),
      public: served ? "yes" : "NO",
    });
  }
  rows.sort((a, b) => b.afterKB - a.afterKB);
  console.table(rows);
  console.log(
    `served total ${rows
      .filter((r) => r.public === "yes")
      .reduce((s, r) => s + r.afterKB, 0)}KB across ${APPROVED.length} images`
  );
  console.log(
    "only APPROVED names are copied to public/; everything else stays in assets/raw"
  );
})();
