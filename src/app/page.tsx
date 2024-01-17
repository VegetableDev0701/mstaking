import FeaturedSection from "@/components/featured-section/FeaturedSection";
import TrendingCollections from "@/components/trending-collections/TrendingCollections";
import { DummyFeaturedCollections } from "@/constants";

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col gap-10 mb-5">
      <FeaturedSection
        heading="Featured Collections"
        sections={DummyFeaturedCollections}
      />
      <TrendingCollections />
      <FeaturedSection
        heading="Winner Communities"
        sections={DummyFeaturedCollections}
      />
    </main>
  );
}
