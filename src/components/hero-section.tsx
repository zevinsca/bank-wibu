import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="mx-auto container lg:min-h-screen min-h-px lg:pt-44 pt-28 lg:px-0 px-3 "
      id="hero-section"
    >
      <div className="relative h-[30vh] lg:h-[70vh] w-full lg:rounded-4xl rounded-xl overflow-hidden">
        <Image
          fill
          className="object-cover "
          src="/hero/hero-banner.jpg"
          alt="Home Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/60 to-pink-300/40 z-10" />

        <div className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center">
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-md">
            Your Daily Dose of Anime News,
            <br />
            Game Drops & Epic Reveals
          </h1>
        </div>
      </div>
    </section>
  );
}
