"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverHttp = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const user_routes_1 = __importDefault(require("./routes/User/user.routes"));
const recipe_routes_1 = __importDefault(require("./routes/Recipe/recipe.routes"));
const favorite_routes_1 = __importDefault(require("./routes/Favorite/favorite.routes"));
const category_routes_1 = __importDefault(require("./routes/Category/category.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
app.use('/user', user_routes_1.default);
app.use('/recipe', recipe_routes_1.default);
app.use('/favorite', favorite_routes_1.default);
app.use('/category', category_routes_1.default);
exports.serverHttp = http_1.default.createServer(app);
