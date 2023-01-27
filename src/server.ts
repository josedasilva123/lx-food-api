import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http";

import UserRoutes from './routes/User/user.routes';
import RecipeRoutes from './routes/Recipe/recipe.routes';
import FavoriteRoutes from './routes/Favorite/favorite.routes';
import CategoryRoutes from "./routes/Category/category.routes";
import ReviewRoutes from "./routes/Review/review.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json());

app.use('/user', UserRoutes);
app.use('/recipe', RecipeRoutes);
app.use('/favorite', FavoriteRoutes);
app.use('/category', CategoryRoutes);
app.use('/review', ReviewRoutes);


export const serverHttp = http.createServer(app);

