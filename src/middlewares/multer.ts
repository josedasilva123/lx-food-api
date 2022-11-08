import Multer from "multer";

export const MulterFileHandler = Multer({
   storage: Multer.diskStorage({
      destination: "uploads/",
   }),
   limits: {
      fileSize: 2 * 1024 * 1024,
   },
});

export const MulterSingleUpload = MulterFileHandler.single("file");
