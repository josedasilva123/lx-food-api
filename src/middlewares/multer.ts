import Multer from "multer";
import { S3 } from "aws-sdk";
import MulterS3 from "multer-s3";
import S3Storage from "multer-sharp-s3"
import sharp from "sharp";

const s3 = new S3({
   region: process.env.AWS_DEFAULT_REGION
});

const storages = {
   local:  Multer.diskStorage({
      destination: "uploads/",
   }),
   aws: S3Storage({
      s3,
      Bucket: 'alexcondertestingbucket321',
      Key: MulterS3.AUTO_CONTENT_TYPE,
      ACL: 'public-read',
      resize: {
         width: 1000,
         options: {
            fit: sharp.fit.contain,
         }
      },
      toFormat: 'webp',    
   })
}

export const MulterFileHandler = Multer({
   storage: storages.aws,
   limits: {
      fileSize: 2 * 1024 * 1024,
   },
});

export const MulterSingleUpload = MulterFileHandler.single("file");
