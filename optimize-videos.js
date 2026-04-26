#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import ffmpegStatic from 'ffmpeg-static';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');
const BACKUP_DIR = path.resolve(ROOT_DIR, 'backup_videos');

const DISCOVERY_EXTENSIONS = new Set(['.mp4', '.mov', '.m4v', '.mkv', '.avi', '.webm']);
const H264_AAC_COMPATIBLE_EXTENSIONS = new Set(['.mp4', '.mov', '.m4v', '.mkv', '.avi']);

const FFMPEG_BINARY = ffmpegStatic || 'ffmpeg';

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

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function runProcess(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] });

    let stderr = '';

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      reject(new Error(`No se pudo ejecutar ${command}: ${error.message}`));
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      const details = stderr.trim().split('\n').slice(-12).join('\n');
      reject(new Error(details || `${command} finalizo con codigo ${code}`));
    });
  });
}

async function ensureFfmpegAvailable() {
  await runProcess(FFMPEG_BINARY, ['-version']);
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

async function findAvailablePath(targetPath) {
  if (!(await pathExists(targetPath))) {
    return targetPath;
  }

  const dir = path.dirname(targetPath);
  const extension = path.extname(targetPath);
  const baseName = path.basename(targetPath, extension);

  let index = 1;
  while (true) {
    const candidate = path.join(dir, `${baseName}_${index}${extension}`);
    if (!(await pathExists(candidate))) {
      return candidate;
    }

    index += 1;
  }
}

async function collectVideosRecursive(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      const nestedFiles = await collectVideosRecursive(entryPath);
      files.push(...nestedFiles);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (DISCOVERY_EXTENSIONS.has(extension)) {
      files.push(entryPath);
    }
  }

  return files;
}

function buildFfmpegArgs(inputPath, outputPath, extension) {
  const args = [
    '-y',
    '-i',
    inputPath,
    '-c:v',
    'libx264',
    '-crf',
    '26',
    '-preset',
    'slow',
    '-vf',
    'scale=-2:min(1080\\,ih)',
    '-c:a',
    'aac',
    '-b:a',
    '128k'
  ];

  if (extension === '.mp4' || extension === '.mov' || extension === '.m4v') {
    args.push('-movflags', '+faststart');
  }

  args.push(outputPath);
  return args;
}

async function run() {
  const publicExists = await pathExists(PUBLIC_DIR);
  if (!publicExists) {
    throw new Error(`No existe la carpeta public en: ${PUBLIC_DIR}`);
  }

  await ensureFfmpegAvailable();
  await fs.mkdir(BACKUP_DIR, { recursive: true });

  const videoFiles = await collectVideosRecursive(PUBLIC_DIR);

  if (videoFiles.length === 0) {
    console.log('No se encontraron videos en la carpeta public.');
    return;
  }

  let processedCount = 0;
  let failedCount = 0;
  let skippedCount = 0;

  for (const sourcePath of videoFiles) {
    const extension = path.extname(sourcePath).toLowerCase();

    if (!H264_AAC_COMPATIBLE_EXTENSIONS.has(extension)) {
      skippedCount += 1;
      console.warn(`Omitido por contenedor no compatible con H.264 + AAC manteniendo extension: ${toWorkspaceRelative(sourcePath)}`);
      continue;
    }

    const relativePath = path.relative(PUBLIC_DIR, sourcePath);
    const desiredBackupPath = path.resolve(BACKUP_DIR, relativePath);
    const backupPath = await findAvailablePath(desiredBackupPath);
    const tempOutputPath = path.join(
      path.dirname(sourcePath),
      `${path.basename(sourcePath, extension)}.__opt_tmp__${Date.now()}${extension}`
    );

    let originalSize = 0;

    try {
      const originalStats = await fs.stat(sourcePath);
      originalSize = originalStats.size;

      await moveFile(sourcePath, backupPath);

      const ffmpegArgs = buildFfmpegArgs(backupPath, tempOutputPath, extension);
      await runProcess(FFMPEG_BINARY, ffmpegArgs);
      await fs.rename(tempOutputPath, sourcePath);

      const optimizedStats = await fs.stat(sourcePath);
      const optimizedSize = optimizedStats.size;
      const savingsPercent = originalSize > 0
        ? ((originalSize - optimizedSize) / originalSize) * 100
        : 0;

      console.log(
        `Video: ${toWorkspaceRelative(sourcePath)} | Original: ${formatBytes(originalSize)} | Optimizado: ${formatBytes(optimizedSize)} | Ahorro: ${savingsPercent.toFixed(2)}%`
      );

      processedCount += 1;
    } catch (error) {
      failedCount += 1;

      if (await pathExists(tempOutputPath)) {
        await fs.unlink(tempOutputPath).catch(() => {});
      }

      if (!(await pathExists(sourcePath)) && (await pathExists(backupPath))) {
        await fs.mkdir(path.dirname(sourcePath), { recursive: true }).catch(() => {});
        await fs.copyFile(backupPath, sourcePath).catch(() => {});
      }

      console.error(`[ERROR] ${toWorkspaceRelative(sourcePath)}: ${error.message}`);
    }
  }

  console.log('\nResumen:');
  console.log(`Procesados: ${processedCount}`);
  console.log(`Fallidos: ${failedCount}`);
  console.log(`Omitidos: ${skippedCount}`);
  console.log(`Backup: ${toWorkspaceRelative(BACKUP_DIR)}`);
}

run().catch((error) => {
  console.error(`Error: ${error.message}`);
  if (!ffmpegStatic) {
    console.error('Instala FFmpeg globalmente o agrega la dependencia ffmpeg-static.');
  }
  process.exit(1);
});
