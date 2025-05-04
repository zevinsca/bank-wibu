import CategoryCard from "./category-card";

export default function CategorySection() {
  return (
    <section
      className="mx-auto container lg:pt-20 pt-10 lg:px-16 px-3"
      id="category-section"
    >
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-3">
        <CategoryCard
          href="/categories/anime"
          src="/category/anime.jpg"
          alt="Anime Category"
          title="Anime"
        />
        <CategoryCard
          href="/categories/games"
          src="/category/games.jpg"
          alt="Games Category"
          title="Games"
        />
        <CategoryCard
          href="/categories/media"
          src="/category/media.jpg"
          alt="Media Category"
          title="Media"
        />
        <CategoryCard
          href="/categories/culture"
          src="/category/culture.jpg"
          alt="Culture Category"
          title="Culture"
        />
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-3 pt-3">
        <CategoryCard
          href="/categories/top%20lists%20&%20features"
          src="/category/top-list.jpg"
          alt="Top Lists & Features Category"
          title="Top Lists & Features"
        />
        <CategoryCard
          href="/categories/merch%20&%20collectibles"
          src="/category/collectibles.jpg"
          alt="Merch and Collectibles Category"
          title="Merch and Collectibles"
        />
        <CategoryCard
          href="/categories/events"
          src="/category/event.jpg"
          alt="Events Category"
          title="Events"
        />
      </div>
    </section>
  );
}
