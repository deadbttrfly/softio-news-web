import express from "express";
import cors from "cors";
import newsRoutes from "./routes/news.routes.js";
import db from "./config/database.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/news", newsRoutes);

try {
  const connection = await db.getConnection();

  console.log("Database connected");

  connection.release();
} catch (error) {
  console.error(error);
}

app.listen(8000, () => {
  console.log("Server running on port 8000");
});