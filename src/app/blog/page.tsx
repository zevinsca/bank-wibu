"use client";

import { useEffect, useState } from "react";
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
  category: { name: string };
}

export default function BlogPage() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch(
        "https://sacredreceipt-us.backendless.app/api/data/Articles?loadRelations=category"
      );
      const data = await res.json();
      setArticles(data);

      const unique = Array.from(
        new Set(data.map((item: ArticleType) => item.category?.name))
      );
      setCategories(unique);
    };

    fetchArticles();
  }, []);

  // Filtered articles
  const filteredArticles =
    selectedCategories.length === 0
      ? articles
      : articles.filter((article) =>
          selectedCategories.includes(article.category?.name)
        );

  // Handle checkbox toggle
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <section className="pt-36 pb-8 px-8 text-black mx-auto container">
      <h2 className="text-3xl font-bold">Blog</h2>
      <div className="grid grid-cols-4 pt-10">
        {/* <div> put the category filter checkbox here</div> */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
          {categories.map((category) => (
            <div key={category} className="mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                {category}
              </label>
            </div>
          ))}
        </div>
        <div className="grid col-span-3 grid-cols-3 max-w-screen gap-x-4 gap-y-8">
          {filteredArticles.map((article: ArticleType) => (
            <article key={article.slug} className="bg-white shadow-lg">
              <div className="relative h-56 w-full">
                <Image
                  src={article.image}
                  alt="Article Image"
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>
              <div className="p-4 h-90 flex flex-col">
                {/* <span>{article.category.name}</span> */}
                <h2 className="text-base font-semibold ">{article.title}</h2>
                <p className="text-sm mt-2">{article.excerpt}</p>
                <Link
                  href={`/blog/${article.slug}`}
                  className="bg-[#fe758c] mb-2 text-white hover:text-black rounded-lg hover:border-1 hover:border-black hover:bg-transparent py-2 px-4 block w-fit mt-auto"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
