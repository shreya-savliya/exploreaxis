import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "../routes/Routes.js";

const applyMiddlewares = (app) => {
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
    app.use('/', router);

};

export default applyMiddlewares;
