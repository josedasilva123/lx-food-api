"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Storage = void 0;
const aws_sdk_1 = require("aws-sdk");
class S3Storage {
    constructor() {
        this.bucket = "alexconderexamplebucket",
            this.s3 = new aws_sdk_1.S3({
                region: "sa-east-1",
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
            });
    }
}
exports.S3Storage = S3Storage;
