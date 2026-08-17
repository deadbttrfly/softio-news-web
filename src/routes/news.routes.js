import express from "express";

import {
  getNews,
  getNewsDetailById,
  getNewsDetail,
  storeNews,
  editNews,
  removeNews,
} from "../controllers/news.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getNews);

router.get(
  "/id/:id",
  getNewsDetailById
);

router.get(
  "/:slug",
  getNewsDetail
);

router.post(
  "/",
  authMiddleware,
  storeNews
);

router.put(
  "/:id",
  authMiddleware,
  editNews
);

router.delete(
  "/:id",
  authMiddleware,
  removeNews
);


export default router;