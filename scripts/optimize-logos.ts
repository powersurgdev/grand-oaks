import sharp from "sharp";
import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.resolve("client/public");

async function optimizeLogos() {
  const logos = [
    { input: "logo.png", output: "logo.png", maxWidth: 400 },
    { input: "logo-text-cropped.png", output: "logo-text-cropped.png", maxWidth: 300 },
    { input: "logo-footer.png", output: "logo-footer.png", maxWidth: 400 },
    { input: "logo-final.png", output: "logo-final.png", maxWidth: 400 },
    { input: "logo-full.png", output: "logo-full.png", maxWidth: 400 },
    { input: "logo-hd.png", output: "logo-hd.png", maxWidth: 400 },
  ];

  for (const logo of logos) {
    const inputPath = path.join(PUBLIC_DIR, logo.input);

    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${logo.input} - not found`);
      continue;
    }

    const originalSize = fs.statSync(inputPath).size;
    const tempPath = inputPath + ".tmp";

    try {
      await sharp(inputPath)
        .resize(logo.maxWidth, undefined, { withoutEnlargement: true })
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(tempPath);

      const newSize = fs.statSync(tempPath).size;
      const savings = (((originalSize - newSize) / originalSize) * 100).toFixed(1);

      // Replace original with optimized
      fs.renameSync(tempPath, inputPath);

      console.log(`${logo.input}: ${(originalSize / 1024).toFixed(0)} KB → ${(newSize / 1024).toFixed(0)} KB (${savings}% savings)`);
    } catch (err) {
      console.error(`Error optimizing ${logo.input}:`, err);
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
  }

  console.log("\nLogo optimization complete!");
}

optimizeLogos();
