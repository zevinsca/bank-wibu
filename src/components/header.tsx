"use client";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

import Link from "next/link";
import Image from "next/image";

interface Category {
  objectId: string;
  name: string;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          "https://sacredreceipt-us.backendless.app/api/data/Categories"
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <header className="">
      {/* Desktop Navigation */}
      <nav className="md:block hidden pt-2 pb-5 font-lato fixed left-0 right-0 top-0 bg-white z-50 shadow-lg">
        <div className="flex justify-between items-center px-20">
          <div className="relative h-20 w-20">
            <Link href="/">
              <Image fill src="/nav/bank-wibu.png" alt="Bank Wibu Logo" />
            </Link>
          </div>
          <ul className="flex gap-10">
            <li>
              <Link href="/" className="">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className=""
              >
                Categories
              </button>
              {isDropdownOpen && (
                <ul className="absolute top-full right-0 mt-2 bg-white border rounded shadow-lg py-2 w-56 z-50">
                  {categories.map((category: Category) => (
                    <li key={category.objectId}>
                      <Link
                        href={`/categories/${category.name.toLowerCase()}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ul>
        </div>
      </nav>
      {/* Mobile Navigation */}
      <nav className="block md:hidden py-3 fixed left-0 right-0 top-0 bg-white z-50 shadow-md">
        <div className="px-5 flex justify-between items-center relative">
          <div className="relative h-20 w-20">
            <Link href="/">
              <Image fill src="/nav/bank-wibu.png" alt="Bank Wibu Logo" />
            </Link>
          </div>
          <button className="flex sm:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoClose /> : <RxHamburgerMenu />}
          </button>

          {isOpen && (
            <ul className="flex flex-col border-t border-white absolute left-0 top-full w-full bg-white z-40 px-5 pb-10 gap-5 text-center mt-3 shadow-md">
              <li>
                <Link href="/" className="font-lato">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <div className="relative ">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className=""
                >
                  Categories
                </button>
                {isDropdownOpen && (
                  <ul className="top-full right-0 mt-2  py-2 w-full bg-[#fe758c] text-white z-50 shadow-md">
                    {categories.map((category: Category) => (
                      <li key={category.objectId}>
                        <Link
                          href={`/categories/${category.name.toLowerCase()}`}
                          className="block px-4 py-2 hover:bg-gray-100 active:bg-gray-100 active:text-black text-white"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
