import {
  IoCloudUploadOutline,
  IoClose,
  IoCheckmarkCircle,
  IoMusicalNotes,
  IoImage,
  IoDocument,
} from "react-icons/io5";

// Predefined file type configurations
export const FILE_TYPE_CONFIGS = {
  image: {
    accept: ".png, .jpg, .jpeg, .gif, .webp, .svg, .tiff",
    label: "Click to upload image",
    description: "SVG, PNG, JPEG, TIFF, GIF or WEBP",
    emptyIcon: IoImage,
    uploadIcon: IoCloudUploadOutline,
    showPreview: true,
  },
  audio: {
    accept: ".mp3, .wav, .flac, .aac, .ogg, .m4a",
    label: "Click to upload audio",
    description: "MP3, WAV, FLAC, AAC, OGG or M4A",
    emptyIcon: IoMusicalNotes,
    uploadIcon: IoCloudUploadOutline,
    showPreview: false,
  },
  document: {
    accept: ".pdf, .doc, .docx, .txt, .rtf",
    label: "Click to upload document",
    description: "PDF, DOC, DOCX, TXT or RTF",
    emptyIcon: IoDocument,
    uploadIcon: IoCloudUploadOutline,
    showPreview: false,
  },
  video: {
    accept: ".mp4, .avi, .mov, .wmv, .flv, .webm",
    label: "Click to upload video",
    description: "MP4, AVI, MOV, WMV, FLV or WEBM",
    emptyIcon: IoDocument,
    uploadIcon: IoCloudUploadOutline,
    showPreview: false,
  },
};
