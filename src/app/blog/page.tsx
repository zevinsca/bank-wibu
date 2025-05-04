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
  const [loading, setLoading] = useState(true);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true); // Start loading
      const res = await fetch(
        "https://sacredreceipt-us.backendless.app/api/data/Articles?loadRelations=category"
      );
      const data = await res.json();
      setArticles(data);

      const unique: string[] = Array.from(
        new Set(data.map((item: ArticleType) => item.category?.name))
      );

      setCategories(unique);
      setLoading(false);
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
      {/* Mobile filter toggle button */}
      <div className="lg:hidden mb-6 mt-3">
        <button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className="bg-[#fe758c] text-white px-4 py-2 rounded-md w-full mb-5"
        >
          {showMobileFilter ? "Hide Filters" : "Filter by Category"}
        </button>

        {showMobileFilter && (
          <div className="mt-0 border rounded-md p-4 bg-gray-50 mb-5">
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
        )}
        <div className="">
          {loading ? (
            <p className="text-center text-gray-500">Loading articles...</p> // Loading message
          ) : filteredArticles.length === 0 ? (
            <p className="text-center text-gray-500">No results found.</p>
          ) : (
            <div className="grid lg:grid-cols-3 max-w-screen gap-x-4 gap-y-8">
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
                  <div className="p-4 lg:h-90 h-full flex flex-col">
                    {/* <span>{article.category.name}</span> */}
                    <h2 className="text-base font-semibold ">
                      {article.title}
                    </h2>
                    <p className="text-sm mt-2">{article.excerpt}</p>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="bg-[#fe758c] mb-2 text-white hover:text-black rounded-lg hover:border-1 hover:border-black hover:bg-transparent py-2 px-4 block w-fit lg:mt-auto mt-10"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="grid lg:grid-cols-4 pt-10 ">
          <div className="lg:col-span-1">
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
          <div className="lg:col-span-3">
            {loading ? (
              <p className="text-center text-gray-500">Loading articles...</p> // Loading message
            ) : filteredArticles.length === 0 ? (
              <p className="text-center text-gray-500">No results found.</p>
            ) : (
              <div className="grid lg:grid-cols-3 max-w-screen gap-x-4 gap-y-8">
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
                    <div className="p-4 lg:h-90 h-full flex flex-col">
                      {/* <span>{article.category.name}</span> */}
                      <h2 className="text-base font-semibold ">
                        {article.title}
                      </h2>
                      <p className="text-sm mt-2">{article.excerpt}</p>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="bg-[#fe758c] mb-2 text-white hover:text-black rounded-lg hover:border-1 hover:border-black hover:bg-transparent py-2 px-4 block w-fit lg:mt-auto mt-10"
                      >
                        Read More
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
