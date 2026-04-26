#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import ffmpegStatic from 'ffmpeg-static';

const ROOT_DIR = process.cwd();
const VIDEOS_DIR = path.resolve(ROOT_DIR, 'public');
const FFMPEG_BINARY = ffmpegStatic || 'ffmpeg';

const SUPPORTED_EXTENSIONS = new Set(['.mp4', '.mov', '.m4v', '.mkv', '.webm']);

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
    if (SUPPORTED_EXTENSIONS.has(extension)) {
      files.push(entryPath);
    }
  }

  return files;
}

function runProcess(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'ignore', 'pipe'] });

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

function buildPosterArgs(videoPath, posterPath) {
  return [
    '-y',
    '-i',
    videoPath,
    '-ss',
    '1.0',
    '-vframes',
    '1',
    '-an',
    '-sn',
    '-dn',
    '-map_metadata',
    '-1',
    '-vf',
    "scale='if(gt(iw,1920),1920,iw)':'if(gt(iw,1920),-2,ih)'",
    '-c:v',
    'libwebp',
    '-q:v',
    '80',
    '-compression_level',
    '6',
    posterPath
  ];
}

async function ensureFfmpegAvailable() {
  await runProcess(FFMPEG_BINARY, ['-version']);
}

async function run() {
  if (!(await pathExists(VIDEOS_DIR))) {
    throw new Error(`No existe la carpeta de videos: ${toWorkspaceRelative(VIDEOS_DIR)}`);
  }

  await ensureFfmpegAvailable();

  const videoFiles = await collectVideosRecursive(VIDEOS_DIR);
  videoFiles.sort((a, b) => a.localeCompare(b));

  if (videoFiles.length === 0) {
    console.log(`No se encontraron videos compatibles en ${toWorkspaceRelative(VIDEOS_DIR)}.`);
    return;
  }

  let createdCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const videoPath of videoFiles) {
    const posterPath = replaceExtension(videoPath, '.webp');

    if (await pathExists(posterPath)) {
      skippedCount += 1;
      console.log(`[SKIP] Ya existe: ${toWorkspaceRelative(posterPath)}`);
      continue;
    }

    try {
      const ffmpegArgs = buildPosterArgs(videoPath, posterPath);
      await runProcess(FFMPEG_BINARY, ffmpegArgs);
      createdCount += 1;
      console.log(`[OK] ${toWorkspaceRelative(videoPath)} -> ${toWorkspaceRelative(posterPath)}`);
    } catch (error) {
      errorCount += 1;
      await fs.unlink(posterPath).catch(() => {});
      console.error(`[ERROR] ${toWorkspaceRelative(videoPath)}: ${error.message}`);
    }
  }

  console.log('\nResumen:');
  console.log(`Posters creados: ${createdCount}`);
  console.log(`Omitidos (ya existian): ${skippedCount}`);
  console.log(`Errores: ${errorCount}`);
}

run().catch((error) => {
  console.error(`Error: ${error.message}`);
  if (!ffmpegStatic) {
    console.error('Instala FFmpeg globalmente o agrega la dependencia ffmpeg-static.');
  }
  process.exit(1);
});