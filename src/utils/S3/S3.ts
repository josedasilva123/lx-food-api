import { S3 } from "aws-sdk";

export class S3Storage{
    s3: S3;

    constructor(){
        this.s3 = new S3({
            region: "sa-east-1",
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACESS_KEY as string,
         });
    }
}