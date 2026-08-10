import express from "express";
import {
  getNews,
  getNewsDetailById,
  getNewsDetail,
  storeNews,
  editNews,
  removeNews,
} from "../controllers/news.controller.js";


const router = express.Router();

router.get("/", getNews);
router.get("/id/:id", getNewsDetailById);
router.get("/:slug", getNewsDetail);
router.post("/", storeNews);
router.put("/:id", editNews);
router.delete("/:id", removeNews);

export default router;