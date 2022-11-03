import sharp from "sharp";
import { File } from "./File";

export class Image extends File{
    async optmize(file: Express.Multer.File){
        await sharp(file.path)
        .resize({
            fit: sharp.fit.contain,
            width: 1000,
        })
        .webp({ quality: 50 })
        .toFile(`uploads/webp/${file.filename}`);

        return { path: `${process.env.BASE_URL}/uploads/webp/${file.filename}`}
    }
}