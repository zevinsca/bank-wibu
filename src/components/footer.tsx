import Link from "next/link";
import Image from "next/image";
interface Category {
  objectId: string;
  name: string;
}

export default async function Footer() {
  const res = await fetch(
    "https://sacredreceipt-us.backendless.app/api/data/Categories",
    { cache: "no-store" } // or "force-cache" if you prefer caching
  );
  const categories: Category[] = await res.json();
  return (
    <footer className="">
      <div className="bg-[#F5F5F5]">
        <div className="container mx-auto lg:pt-5 pt-10 lg:pb-3 pb-16">
          <nav className="grid grid-cols-4 items-start pb-16 gap-10">
            <div className="flex flex-col">
              <div className="relative h-36 w-36 mb-5">
                <Image
                  fill
                  src="/nav/bank-wibu.png"
                  alt="Bank Wibu Logo"
                  className="object-cover"
                />
              </div>
              <p className="text-left font-semibold">
                Your One-Stop Portal for Anime & Gaming News.
              </p>
            </div>

            <ul className="flex flex-col items-start gap-5 pt-5">
              <li>
                <Link href="#hero-section" className="font-lato">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about-me-section">Blog</Link>
              </li>
              <li>
                <Link href="#my-skills-section">Categories</Link>
              </li>
            </ul>
            <ul className="flex flex-col items-start pt-5">
              <p className="px-4 font-bold pb-3">CATEGORIES</p>
              {categories.map((category: Category) => (
                <li key={category.objectId}>
                  <Link
                    href={`/categories/${category.name.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-5">
              <p className="text-left font-semibold">REACH US!</p>
            </div>
          </nav>
          <p className="text-center">
            Copyright © 2025 Bank Wibu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
