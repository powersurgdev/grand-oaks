import sharp from "sharp";
import fs from "fs";
import path from "path";

const INPUT_DIR = path.resolve("client/public/images");
const OUTPUT_DIR = path.resolve("client/public/images/optimized");

const MAX_WIDTH = 1200;
const QUALITY = 80;

async function optimizeImages() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(INPUT_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return [".jpg", ".jpeg", ".png"].includes(ext) && !f.includes("optimized");
  });

  console.log(`Found ${files.length} images to optimize...\n`);

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const stat = fs.statSync(inputPath);

    if (stat.isDirectory()) continue;

    const baseName = path.parse(file).name;
    const webpPath = path.join(OUTPUT_DIR, `${baseName}.webp`);
    const jpgPath = path.join(OUTPUT_DIR, `${baseName}.jpg`);

    const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
    console.log(`Processing: ${file} (${sizeMB} MB)`);

    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      const resizeWidth = metadata.width && metadata.width > MAX_WIDTH ? MAX_WIDTH : undefined;

      await sharp(inputPath)
        .resize(resizeWidth, undefined, { withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(webpPath);

      await sharp(inputPath)
        .resize(resizeWidth, undefined, { withoutEnlargement: true })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(jpgPath);

      const webpSize = fs.statSync(webpPath).size;
      const jpgSize = fs.statSync(jpgPath).size;
      const webpKB = (webpSize / 1024).toFixed(0);
      const jpgKB = (jpgSize / 1024).toFixed(0);
      const savings = (((stat.size - webpSize) / stat.size) * 100).toFixed(1);

      console.log(`  -> WebP: ${webpKB} KB | JPG: ${jpgKB} KB | Savings: ${savings}%\n`);
    } catch (err) {
      console.error(`  ERROR processing ${file}:`, err);
    }
  }

  console.log("Image optimization complete!");
}

optimizeImages();
