import sharp from "sharp";
import fs from "fs";
import path from "path";

const ATTACHED_DIR = path.resolve("attached_assets");
const MAX_WIDTH = 1200;
const QUALITY = 80;

async function optimizeAttachedAssets() {
  if (!fs.existsSync(ATTACHED_DIR)) {
    console.log("attached_assets directory not found");
    return;
  }

  const files = fs.readdirSync(ATTACHED_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return [".jpg", ".jpeg", ".png"].includes(ext);
  });

  console.log(`Found ${files.length} images to optimize in attached_assets...\n`);

  for (const file of files) {
    const inputPath = path.join(ATTACHED_DIR, file);
    const stat = fs.statSync(inputPath);

    if (stat.isDirectory()) continue;

    const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
    console.log(`Processing: ${file} (${sizeMB} MB)`);

    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      const resizeWidth = metadata.width && metadata.width > MAX_WIDTH ? MAX_WIDTH : undefined;
      const tempPath = inputPath + ".tmp";

      // Determine output format
      const ext = path.extname(file).toLowerCase();
      if (ext === ".png") {
        await sharp(inputPath)
          .resize(resizeWidth, undefined, { withoutEnlargement: true })
          .png({ quality: QUALITY, compressionLevel: 9 })
          .toFile(tempPath);
      } else {
        await sharp(inputPath)
          .resize(resizeWidth, undefined, { withoutEnlargement: true })
          .jpeg({ quality: QUALITY, mozjpeg: true })
          .toFile(tempPath);
      }

      const newSize = fs.statSync(tempPath).size;
      const newKB = (newSize / 1024).toFixed(0);
      const savings = (((stat.size - newSize) / stat.size) * 100).toFixed(1);

      // Replace original with optimized
      fs.renameSync(tempPath, inputPath);

      console.log(`  -> Optimized: ${newKB} KB | Savings: ${savings}%\n`);
    } catch (err) {
      console.error(`  ERROR processing ${file}:`, err);
    }
  }

  console.log("Attached assets optimization complete!");
}

optimizeAttachedAssets();
