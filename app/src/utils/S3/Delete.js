"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Delete = void 0;
const S3_1 = require("./S3");
class S3Delete extends S3_1.S3Storage {
    execute(Key) {
        this.s3.deleteObject({ Bucket: this.bucket, Key });
    }
}
exports.S3Delete = S3Delete;
