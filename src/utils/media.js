const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.m4v', '.mkv', '.webm'];

export function isVideoMediaPath(mediaPath) {
  if (typeof mediaPath !== 'string') {
    return false;
  }

  const normalized = mediaPath.toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => normalized.endsWith(ext));
}

export function getPosterPathFromVideo(mediaPath) {
  if (!isVideoMediaPath(mediaPath)) {
    return undefined;
  }

  return mediaPath.replace(/\.[^.]+$/, '.webp');
}