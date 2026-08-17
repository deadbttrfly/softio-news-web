import db from "../config/database.js";

export async function getAllNews(category = null) {
  let query = `
    SELECT *
    FROM news
  `;

  const params = [];

  if (category) {
    query += `
      WHERE LOWER(category) = LOWER(?)
    `;

    params.push(category);
  }

  query += `
    ORDER BY created_at DESC
  `;

  const [rows] = await db.execute(
    query,
    params
  );

  return rows;
}

export async function getNewsBySlug(slug) {
  const [rows] = await db.execute(
    "SELECT * FROM news WHERE slug = ?",
    [slug]
  );

  return rows[0];
}

export async function getNewsById(id) {
  const [rows] = await db.execute(
    "SELECT * FROM news WHERE id = ?",
    [id]
  );

  return rows[0];
}

export async function createNews(data) {
  const {
    slug,
    title,
    excerpt,
    content,
    category,
    author,
    image_url,
  } = data;

  const [result] = await db.execute(
    `INSERT INTO news
    (
      slug,
      title,
      excerpt,
      content,
      category,
      author,
      image_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      slug,
      title,
      excerpt,
      content,
      category,
      author,
      image_url,
    ]
  );

  return result;
}

export async function updateNews(id, data) {
  const {
    slug,
    title,
    excerpt,
    content,
    category,
    author,
    image_url,
  } = data;

  const [result] = await db.execute(
    `UPDATE news
     SET
       slug = ?,
       title = ?,
       excerpt = ?,
       content = ?,
       category = ?,
       author = ?,
       image_url = ?
     WHERE id = ?`,
    [
      slug,
      title,
      excerpt,
      content,
      category,
      author,
      image_url,
      id,
    ]
  );

  return result;
}

export async function deleteNews(id) {
  const [result] = await db.execute(
    "DELETE FROM news WHERE id = ?",
    [id]
  );

  return result;
}