import express from "express";
import { newsArticles } from "../data/news.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(newsArticles);
});

router.get("/:slug", (req, res) => {
  const article = newsArticles.find(
    news => news.slug === req.params.slug
  );

  if (!article) {
    return res.status(404).json({
      message: "Berita tidak ditemukan"
    });
  }

  res.json(article);
});

export default router;