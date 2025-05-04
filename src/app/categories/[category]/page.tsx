"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface ArticleType {
  content: string;
  created: number;
  image: string;
  slug: string;
  ownerId: string;
  excerpt: string;
  title: string;
  updated: number;
  category: { name: string; description?: string };
}

export default function CategoryPage() {
  const params = useParams(); // for app router
  const categoryName = params.category as string;
  const decodedCategoryName = decodeURIComponent(categoryName);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true); // Start loading
      try {
        const res = await fetch(
          `https://sacredreceipt-us.backendless.app/api/data/Articles?loadRelations=category`
        );
        const data = await res.json();
        const filtered = data.filter(
          (article: ArticleType) =>
            article.category?.name.toLowerCase() === decodedCategoryName
        );
        setArticles(filtered);
        if (filtered.length > 0) {
          setCategoryDescription(filtered[0].category?.description || "");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchArticles();
  }, [decodedCategoryName]);

  console.log(articles);

  return (
    <section className="pt-36 pb-8 px-8 text-black mx-auto container h-full">
      <h2 className="text-3xl font-bold">
        {decodedCategoryName.toUpperCase()}
      </h2>
      {categoryDescription && (
        <p className="mt-2 lg:text-base text-sm text-gray-600">
          {categoryDescription}
        </p>
      )}
      <div className="mt-10">
        {loading ? (
          <p className="text-center text-gray-500">Loading articles...</p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-500">
            No results found in this category.
          </p>
        ) : (
          <div className="grid lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <article key={article.slug} className="bg-white shadow-lg">
                <div className="relative h-56 w-full">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover rounded-t-2xl"
                  />
                </div>
                <div className="p-4 lg:h-90 h-full flex flex-col">
                  <h2 className="text-base font-semibold ">{article.title}</h2>
                  <p className="text-sm mt-2">{article.excerpt}</p>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="bg-[#fe758c] mb-2 text-white hover:text-black rounded-lg hover:border-1 hover:border-black hover:bg-transparent py-2 px-4 block w-fit lg:mt-auto mt-3"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
