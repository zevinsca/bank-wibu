"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
type Article = {
  objectId: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  created: Date;
};

export default function Latest() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sacredreceipt-us.backendless.app/api/data/Articles")
      .then((res) => res.json())
      .then((data: Article[]) => {
        const sorted = data.sort(
          (a, b) =>
            new Date(b.created).getTime() - new Date(a.created).getTime()
        );
        setArticles(sorted);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center py-4">Loading latest articles...</p>;

  return (
    <section className="py-8 mx-auto container">
      <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
      <div className="grid lg:grid-cols-3 gap-8">
        {articles.slice(0, 6).map((article) => (
          <div key={article.objectId} className="shadow-lg">
            <div className="relative h-96 w-full ">
              {article.image && (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="mb-4 w-full h-40 object-cover rounded-t-xl"
                />
              )}
            </div>
            <div className="p-4 h-72 flex flex-col">
              <h3 className="text-lg font-semibold mb-2 ">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.excerpt}</p>
              <Link
                href={`/blog/${article.slug}`}
                className="bg-[#fe758c] mb-2 text-white hover:text-black rounded-lg hover:border-1 hover:border-black hover:bg-transparent py-2 px-4 block w-fit mt-auto"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
