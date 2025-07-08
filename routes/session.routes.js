import express from "express";
import { getSession } from "../controllers/session.controller.js";

const router = express.Router();

router.get("/", getSession);

export default router;
