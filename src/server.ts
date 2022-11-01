import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http"

dotenv.config();

const app = express();

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json());

export const serverHttp = http.createServer(app);

