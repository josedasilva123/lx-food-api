"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function Authenticate(req, res, next) {
    const { auth } = req.headers;
    if (auth) {
        jsonwebtoken_1.default.verify(auth, process.env.JWT_SECRETKEY, (err, decoded) => {
            try {
                if (err) {
                    throw new Error("Sua token expirou ou é inválida.");
                }
                (req.body.id = decoded === null || decoded === void 0 ? void 0 : decoded.id), next();
            }
            catch (error) {
                res.status(400).json({ error: "Sua token expirou ou é inválida." });
            }
        });
    }
    else {
        res.status(400).json({ error: "Está rota precisa de autorização." });
    }
}
exports.Authenticate = Authenticate;
