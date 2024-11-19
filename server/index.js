import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import applyMiddlewares from "./middlewares/middlewares.js";
import { ExpressAuth } from "@auth/express";
import GoogleProvider from "@auth/core/providers/google";
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Authentication setup
app.use(
  "/auth",
  ExpressAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        callbackURL: "http://localhost:8000/auth/callback/google",
      }),
    ],
    secret: process.env.AUTH_SECRET,
    basePath: '/auth',
    debug: true,
    callbacks: {
      async redirect({ url, baseUrl }) {
        return "http://localhost:3000";
      },
    },
  })
);


// Apply middlewares
applyMiddlewares(app);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
