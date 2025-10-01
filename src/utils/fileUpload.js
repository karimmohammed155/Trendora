import multer from "multer";

export const fileUpload = () => {
  return multer({
    storage: multer.memoryStorage(), // 👈 keep file in memory, no uploads folder
    limits: { fileSize: 10 * 1024 * 1024 }, // optional: max 10MB
    fileFilter: (req, file, cb) => {
      if (
        ![
          "application/pdf",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ].includes(file.mimetype)
      ) {
        return cb(new Error("Invalid file format"), false);
      }
      cb(null, true);
    },
  });
};
