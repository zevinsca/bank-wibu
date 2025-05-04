import HeroSection from "@/components/hero-section";
import Trending from "@/components/trending";
import Latest from "@/components/latest";
import CategorySection from "@/components/category-section";

export default function HomePage() {
  return (
    <main className="">
      <HeroSection />
      <Trending />
      <CategorySection />
      <Latest />
    </main>
  );
}
