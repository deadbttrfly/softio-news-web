import { newsArticles } from "@/data/news";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetail({
  params,
}: Props) {
  const { slug } = await params;

  const article = newsArticles.find(
    (item) => item.slug === slug
  );

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-5xl font-bold">
        {article.title}
      </h1>

      <img
        src={article.imageUrl}
        alt={article.title}
        width="800"
        height="600"
        className="w-full h-96 object-cover rounded-lg mt-6"
      />

      <p className="text-blue-500 mt-4">
        {article.category}
      </p>

      <p className="mt-2 text-gray-600">
        {article.excerpt}
      </p>

      <hr className="my-6" />

      <h2 className="text-3xl font-bold mb-4">
        Konten Berita
      </h2>

      <p className="mt-6 text-lg">
        {article.content.map((paragraph, index) => (
        <p key={index} className="mt-6 text-lg">
          {paragraph}
        </p>
      ))}
      </p>
    </main>
  );
}