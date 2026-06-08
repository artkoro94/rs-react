export const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
];

export const validateImage = (file: File): boolean => {
  const isValidSize = file.size <= MAX_IMAGE_SIZE;

  const isValidType = ALLOWED_IMAGE_TYPES.includes(file.type);

  return isValidSize && isValidType;
};