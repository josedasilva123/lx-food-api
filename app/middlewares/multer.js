"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterSingleUpload = exports.MulterFileHandler = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_sharp_s3_1 = __importDefault(require("multer-sharp-s3"));
const dotenv_1 = __importDefault(require("dotenv"));
const S3_1 = require("../utils/S3/S3");
dotenv_1.default.config();
const { bucket, s3 } = new S3_1.S3Storage();
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
    local: multer_1.default.diskStorage({
        destination: "uploads/",
    }),
    aws: (0, multer_sharp_s3_1.default)({
        s3,
        Bucket: bucket,
        ACL: "public-read",
        resize: {
            width: 1000,
        },
        toFormat: 'webp'
    }),
};
exports.MulterFileHandler = (0, multer_1.default)({
    storage: storages.aws,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
});
exports.MulterSingleUpload = exports.MulterFileHandler.single("file");
