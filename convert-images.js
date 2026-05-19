#!/usr/bin/env node
// script para convertir imagenes .jpg/.jpeg/.png a .webp dentro de la carpeta public

import fs from 'node:fs/promises';
import path from 'node:path';
import { stdin as input, stdout as output } from 'node:process';
import { createInterface } from 'node:readline/promises';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');
const BACKUP_DIR = path.resolve(ROOT_DIR, 'backup_originals');
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exponent = bytes === 0 ? 0 : Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / (1024 ** exponent);
  return `${value.toFixed(exponent === 0 ? 0 : 2)} ${units[exponent]}`;
}

function toWorkspaceRelative(absolutePath) {
  return path.relative(ROOT_DIR, absolutePath) || '.';
}

function replaceExtension(filePath, newExtension) {
  return path.join(path.dirname(filePath), `${path.basename(filePath, path.extname(filePath))}${newExtension}`);
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function moveFile(sourcePath, destinationPath) {
  await fs.mkdir(path.dirname(destinationPath), { recursive: true });

  try {
    await fs.rename(sourcePath, destinationPath);
  } catch (error) {
    if (error && error.code === 'EXDEV') {
      await fs.copyFile(sourcePath, destinationPath);
      await fs.unlink(sourcePath);
      return;
    }

    throw error;
  }
}

async function collectImagesRecursive(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      const nestedFiles = await collectImagesRecursive(entryPath);
      files.push(...nestedFiles);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (SUPPORTED_EXTENSIONS.has(extension)) {
      files.push(entryPath);
    }
  }

  return files;
}

function parseMode(argv) {
  const hasDelete = argv.includes('--delete');
  const hasMove = argv.includes('--move');
  const hasKeep = argv.includes('--keep-originals');

  const selectedModes = [hasDelete, hasMove, hasKeep].filter(Boolean).length;
  if (selectedModes > 1) {
    throw new Error('Use solo una opcion entre --delete, --move o --keep-originals.');
  }

  if (hasDelete) {
    return 'delete';
  }

  if (hasKeep) {
    return 'keep';
  }

  return 'move';
}

async function confirmDeleteIfNeeded(mode, argv) {
  if (mode !== 'delete') {
    return true;
  }

  if (argv.includes('--yes')) {
    return true;
  }

  const rl = createInterface({ input, output });
  const answer = await rl.question('Vas a borrar los originales. Quieres continuar? (s/N): ');
  rl.close();

  const normalized = answer.trim().toLowerCase();
  return normalized === 's' || normalized === 'si' || normalized === 'y' || normalized === 'yes';
}

function resolveOutputPath(sourcePath, usedOutputs) {
  const preferredPath = replaceExtension(sourcePath, '.webp');

  if (!usedOutputs.has(preferredPath)) {
    usedOutputs.add(preferredPath);
    return preferredPath;
  }

  const sourceExtension = path.extname(sourcePath).slice(1).toLowerCase();
  const baseName = path.basename(sourcePath, path.extname(sourcePath));
  let suffix = sourceExtension;
  let candidatePath = path.join(path.dirname(sourcePath), `${baseName}_${suffix}.webp`);
  let index = 2;

  while (usedOutputs.has(candidatePath)) {
    suffix = `${sourceExtension}_${index}`;
    candidatePath = path.join(path.dirname(sourcePath), `${baseName}_${suffix}.webp`);
    index += 1;
  }

  usedOutputs.add(candidatePath);
  return candidatePath;
}

async function run() {
  const argv = process.argv.slice(2);
  const mode = parseMode(argv);

  const publicExists = await pathExists(PUBLIC_DIR);
  if (!publicExists) {
    throw new Error(`No existe la carpeta public en: ${PUBLIC_DIR}`);
  }

  const shouldDelete = await confirmDeleteIfNeeded(mode, argv);
  if (!shouldDelete) {
    console.log('Operacion cancelada. No se elimino ningun archivo.');
    process.exit(0);
  }

  if (mode === 'move') {
    await fs.mkdir(BACKUP_DIR, { recursive: true });
  }

  const imageFiles = await collectImagesRecursive(PUBLIC_DIR);

  if (imageFiles.length === 0) {
    console.log('No se encontraron imagenes .jpg/.jpeg/.png dentro de public.');
    return;
  }

  const usedOutputPaths = new Set();
  let totalOriginalBytes = 0;
  let totalWebpBytes = 0;
  let processedCount = 0;
  let failedCount = 0;

  for (const sourcePath of imageFiles) {
    try {
      const originalStats = await fs.stat(sourcePath);
      const outputPath = resolveOutputPath(sourcePath, usedOutputPaths);

      const image = sharp(sourcePath);
      const metadata = await image.metadata();

      let pipeline = image;
      if (metadata.width && metadata.width > 1920) {
        pipeline = image.resize({ width: 1920, withoutEnlargement: true });
      }

      await pipeline.webp({ quality: 80 }).toFile(outputPath);

      const webpStats = await fs.stat(outputPath);

      if (mode === 'move') {
        const relativeSourcePath = path.relative(PUBLIC_DIR, sourcePath);
        const backupPath = path.resolve(BACKUP_DIR, relativeSourcePath);
        await moveFile(sourcePath, backupPath);
      } else if (mode === 'delete') {
        await fs.unlink(sourcePath);
      }

      processedCount += 1;
      totalOriginalBytes += originalStats.size;
      totalWebpBytes += webpStats.size;

      const savedBytes = originalStats.size - webpStats.size;
      const savedPercentage = originalStats.size > 0 ? (savedBytes / originalStats.size) * 100 : 0;

      console.log(
        [
          `[OK] ${toWorkspaceRelative(sourcePath)} -> ${toWorkspaceRelative(outputPath)}`,
          `${formatBytes(originalStats.size)} -> ${formatBytes(webpStats.size)}`,
          `Ahorro: ${formatBytes(savedBytes)} (${savedPercentage.toFixed(2)}%)`
        ].join(' | ')
      );
    } catch (error) {
      failedCount += 1;
      console.error(`[ERROR] ${toWorkspaceRelative(sourcePath)}: ${error.message}`);
    }
  }

  const totalSaved = totalOriginalBytes - totalWebpBytes;
  const totalSavedPercentage = totalOriginalBytes > 0 ? (totalSaved / totalOriginalBytes) * 100 : 0;

  console.log('\nResumen:');
  console.log(`Procesadas: ${processedCount}`);
  console.log(`Fallidas: ${failedCount}`);
  console.log(`Total original: ${formatBytes(totalOriginalBytes)}`);
  console.log(`Total webp: ${formatBytes(totalWebpBytes)}`);
  console.log(`Ahorro total: ${formatBytes(totalSaved)} (${totalSavedPercentage.toFixed(2)}%)`);

  if (mode === 'move') {
    console.log(`Originales movidos a: ${toWorkspaceRelative(BACKUP_DIR)}`);
  }
}

run().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
