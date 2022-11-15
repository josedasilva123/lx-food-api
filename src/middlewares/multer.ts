import Multer from "multer";
import MulterSharpS3 from "multer-sharp-s3";
import dotenv from "dotenv";
import { S3Storage } from "../utils/S3/S3";

dotenv.config();

const { bucket, s3 }  = new S3Storage();

/*
 aws: MulterS3({
      s3: s3,
      bucket: "alexconderexamplebucket",
      acl: "public-read",
      contentType: MulterS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
         cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
         cb(null, Date.now().toString());
      },
   }),
*/

const storages = {
   local: Multer.diskStorage({
      destination: "uploads/",
   }),

   aws: MulterSharpS3({
      s3,
      Bucket: bucket,
      ACL: "public-read",
      resize: {
         width: 1000,
      },
      toFormat: 'webp'
   }),
};

export const MulterFileHandler = Multer({
   storage: storages.aws,
   limits: {
      fileSize: 2 * 1024 * 1024,
   },
});

export const MulterSingleUpload = MulterFileHandler.single("file");
