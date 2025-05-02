import Link from "next/link";
import Image from "next/image";

export default function Footer() {
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
            <div></div>
            <div></div>
          </nav>
          <p className="text-center">
            Copyright © 2025 Bank Wibu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
