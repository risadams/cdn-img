/**
 * @file process-images.ts
 * @description This script processes and resizes images from the raw folder and saves them in the dist folder.
 * It uses the sharp library to resize images to multiple target widths and converts them to webp format.
 * 
 * @requires sharp
 * @requires fs-extra
 * @requires path
 * @requires glob
 */

import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';

const RAW_FOLDER = './raw';
const DIST_FOLDER = './img';
const TARGET_WIDTHS = [1400, 1057, 640, 320];

/**
 * Processes images by resizing them to multiple target widths and converting them to webp format.
 * The processed images are saved in the dist folder.
 * 
 * @async
 * @function processImages
 * @returns {Promise<void>}
 */
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

    const processingPromises = imageFiles.map(async (file) => {
      const fileName: string = path.basename(file, path.extname(file)); // Get the file name without extension
      const distPath: string = path.join(DIST_FOLDER);

      const resizePromises = TARGET_WIDTHS.map(async (width) => {
        const outputFilePath: string = path.join(distPath, `${fileName}@${width}w.webp`);

        try {
          // Process and resize the image, then save it in webp format
          await sharp(file)
            .resize({ width })
            .webp({ quality: 80 })
            .toFile(outputFilePath);

          console.log(`Created: ${outputFilePath}`);
        } catch (err) {
          console.error(`Error processing ${file} at width ${width}:`, err);
        }
      });

      await Promise.all(resizePromises);
    });

    await Promise.all(processingPromises);

    console.log('Image processing completed!');
  } catch (err) {
    console.error('Error processing images:', err);
  }
}

// Execute the image processing function
processImages();
