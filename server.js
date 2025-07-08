import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import sessionRoutes from "./routes/session.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // empêche l'accès au cookie par du JS côté client
      secure: false, // à mettre sur true en production si HTTPS
      sameSite: "lax", // réduit le risque CSRF
      maxAge: 1000 * 60 * 15, // expire après 15 minutes
    },
  })
);

app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
