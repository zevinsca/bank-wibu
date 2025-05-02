import HeroSection from "@/components/hero-section";
import Trending from "@/components/trending";
import Latest from "@/components/latest";

export default function HomePage() {
  return (
    <main className="">
      <HeroSection />
      <Trending />
      {/* Grid categories */}
      <Latest />
    </main>
  );
}
