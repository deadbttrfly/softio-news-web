import { getArticleBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetail({
  params,
}: Props) {
  const { slug } = await params;

  let article;

  try {
    article = await getArticleBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-5xl font-bold">
        {article.title}
      </h1>

      <div className="relative w-full h-96 mt-6">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

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

      {article.content.map(
        (paragraph, index) => (
          <p
            key={index}
            className="mt-6 text-lg"
          >
            {paragraph}
          </p>
        )
      )}
    </main>
  );
}