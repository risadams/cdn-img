import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import {glob} from 'glob';

const RAW_FOLDER = './raw';
const DIST_FOLDER = './dist';
const TARGET_WIDTHS = [1400, 1057, 640, 320];

async function processImages(): Promise<void> {
  try {
    // Ensure the dist folder exists
    await fs.ensureDir(DIST_FOLDER);

    // Find all images with specified extensions in the raw folder
    const imageFiles: string[] = glob.sync(`${RAW_FOLDER}/**/*.{jpg,jpeg,png,gif,webp}`);

    if (imageFiles.length === 0) {
      console.log('No images found in the raw folder.');
      return;
    }

    console.log(`Found ${imageFiles.length} images to process...`);

    for (const file of imageFiles) {
      const fileName: string = path.basename(file, path.extname(file)); // Get the file name without extension
      const distPath: string = path.join(DIST_FOLDER);

      for (const width of TARGET_WIDTHS) {
        const outputFilePath: string = path.join(distPath, `${fileName}@${width}w.webp`);

        // Process and resize the image
        await sharp(file)
          .resize({ width })
          .webp({ quality: 80 })
          .toFile(outputFilePath);

        console.log(`Created: ${outputFilePath}`);
      }
    }

    console.log('Image processing completed!');
  } catch (err) {
    console.error('Error processing images:', err);
  }
}

processImages();
