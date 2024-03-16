import express from "express";
import { helloWorld } from "../controllers/index.controller";

const router = express.Router();

router.get("/", helloWorld);

export default router;

