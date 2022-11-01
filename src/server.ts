import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http"

import UserRoutes from './routes/User/user.routes';

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

export const serverHttp = http.createServer(app);

