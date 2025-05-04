"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
type Article = {
  objectId: string;
  title: string;
  content: string;
  image: string;
  excerpt: string;
  slug: string;
};

export default function Trending() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sacredreceipt-us.backendless.app/api/data/Articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center py-4">Loading trending articles...</p>;

  return (
    <section className="mx-auto container">
      <h2 className="text-2xl font-bold mb-6">Trending Articles</h2>
      <div className="mb-10">
        {articles.slice(0, 1).map((article) => (
          <div key={article.objectId} className="px-5 grid grid-cols-5 gap-8">
            <div className="relative h-96 w-full col-span-3 ">
              {article.image && (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="mb-4 w-full h-40 object-cover rounded-2xl"
                />
              )}
            </div>
            <div className="col-span-2 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-2">{article.title}</h3>
              <p className="text-lg text-gray-600">
                {article.content.slice(0, 200)}...
              </p>
              <Link
                href={`/blog/${article.slug}`}
                className="bg-[#fe758c] mb-2 text-white hover:text-black rounded-lg hover:border-1 hover:border-black hover:bg-transparent py-2 px-4 block w-fit mt-3"
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
