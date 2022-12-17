"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const sharp_1 = __importDefault(require("sharp"));
const File_service_1 = require("./File.service");
class Image extends File_service_1.File {
    optmize(file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, sharp_1.default)(file.path, {})
                .resize({
                fit: sharp_1.default.fit.contain,
                width: 1000,
            })
                .webp({ quality: 50 })
                .toFile(`uploads/webp/${file.filename}.webp`);
            sharp_1.default.cache({ files: 0 });
            return { path: `${process.env.BASE_URL}/uploads/webp/${file.filename}` };
        });
    }
}
exports.Image = Image;
