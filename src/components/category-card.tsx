import Link from "next/link";
import Image from "next/image";

export default function CategoryCard(props: {
  src: string;
  alt: string;
  title: string;
  href: string;
}) {
  return (
    <div>
      <Link
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full h-auto overflow-hidden rounded-2xl shadow-lg group"
      >
        <div className="relative w-full lg:h-72 h-56">
          <Image
            fill
            className="object-cover rounded-2xl"
            src={props.src}
            alt={props.alt}
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 group ">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black transition-opacity duration-300 opacity-60 group-hover:opacity-50 group-hover:bg-[#fe758c] z-0 rounded-2xl"></div>

          {/* Always-visible Text */}
          <p className="text-3xl font-bold z-10 opacity-100">{props.title}</p>
        </div>
      </Link>
    </div>
  );
}
