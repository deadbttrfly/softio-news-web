import {
  getAllNews,
  getNewsById,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
} from "../services/news.service.js";

export async function getNews(req, res) {
  try {
    const { category } = req.query;

    const news = await getAllNews(category);

    res.status(200).json(news);
  } catch (error) {
    console.error(
      "Get news error:",
      error
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getNewsDetailById(
  req,
  res
) {
  try {
    const article = await getNewsById(
      req.params.id
    );

    if (!article) {
      return res.status(404).json({
        message:
          "Berita tidak ditemukan",
      });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error(
      "Get news by id error:",
      error
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getNewsDetail(
  req,
  res
) {
  try {
    const article =
      await getNewsBySlug(
        req.params.slug
      );

    if (!article) {
      return res.status(404).json({
        message:
          "Berita tidak ditemukan",
      });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error(
      "Get news detail error:",
      error
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function storeNews(
  req,
  res
) {
  try {
    const result =
      await createNews(req.body);

    res.status(201).json({
      message:
        "Berita berhasil dibuat",

      id: result.insertId,
    });
  } catch (error) {
    console.error(
      "Create news error:",
      error
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function editNews(
  req,
  res
) {
  try {
    const result =
      await updateNews(
        req.params.id,
        req.body
      );

    res.status(200).json({
      message:
        "Berita berhasil diupdate",

      affectedRows:
        result.affectedRows,
    });
  } catch (error) {
    console.error(
      "Update news error:",
      error
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function removeNews(
  req,
  res
) {
  try {
    const result =
      await deleteNews(
        req.params.id
      );

    res.status(200).json({
      message:
        "Berita berhasil dihapus",

      affectedRows:
        result.affectedRows,
    });
  } catch (error) {
    console.error(
      "Delete news error:",
      error
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}