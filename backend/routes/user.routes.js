import express from "express";

import { getUsersToChat } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getUsersToChat);

export default router;
