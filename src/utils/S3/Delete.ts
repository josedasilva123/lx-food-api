import { S3Storage } from "./S3";

export class S3Delete extends S3Storage{
    execute(Key: string){
        this.s3.deleteObject({ Bucket: this.bucket, Key });
    }
}