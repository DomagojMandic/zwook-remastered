/** Creates a date string in ISO format (YYYY-MM-DD) for uploading to the server.
 * @param {Date} date - The date to format
 * @returns {string|null} Formatted date string or null if no date provided
 */

export function dateToISO(date) {
  if (!date) return null;
  return date.toISOString().split("T")[0];
}

/**
 * Formats a file size in bytes to a readable string.
 * @param {number} bytes - The file size in bytes
 * @returns {string} Formatted file size string
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Gets the duration of an audio file.
 * @param {*} file - The audio file
 * @returns {Promise<number|null>} The duration of the audio file in seconds or null if not available
 */

export const getAudioDuration = (file) => {
  return new Promise((resolve) => {
    const audio = new Audio();
    const url = URL.createObjectURL(file);

    audio.addEventListener("loadedmetadata", () => {
      URL.revokeObjectURL(url);
      resolve(Math.round(Number(audio.duration)));
    });

    audio.addEventListener("error", () => {
      URL.revokeObjectURL(url);
      resolve(null);
    });

    audio.src = url;
  });
};

export const editFileName = (fileName) => {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, "-") // Change spaces with -
    .replace(/[^a-z0-9.-]/g, ""); // Remove everything except letters, numbers, dots, and dashes
};

// Time formatting utility
export const formatTime = (time) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

/**
 * Parses a custom date string in the format "YYYY-MM-DD HH:mm:ss.ssssss+TZ"
 * into a JavaScript Date object.
 *
 * Replaces the space between date and time with 'T' and removes
 * microseconds (the part after the decimal point).
 * Returns null if the input is invalid or cannot be parsed.
 *
 * It is used when formatting created_at dates from the API
 *
 * @param {string} dateStr - Date string in the custom format.
 * @returns {Date|null} Parsed Date object or null if invalid.
 */
export function parseCustomDate(dateStr) {
  if (!dateStr) return null;

  const cleaned = dateStr.replace(" ", "T").replace(/\.\d+/, "");

  const date = new Date(cleaned);

  if (isNaN(date)) return null;

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function cleanString(string) {
  return string.toLowerCase().trim();
}
