import express from "express";

import { chatCompletion } from "../controllers/chatGPTController.js";

const router = express.Router();

router.route("/chatCompletion").post(chatCompletion);

export default router;
