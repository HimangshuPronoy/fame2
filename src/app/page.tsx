import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import Categories from "../components/Categories";
import Features from "../components/Features";
import PremiumCuration from "../components/PremiumCuration";
import Testimonials from "../components/Testimonials";
import ListingGrid from "../components/ListingGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroCarousel />
      <Categories />
      <ListingGrid />
      <Features />
      <PremiumCuration />
      <Testimonials />
      <Footer />
    </main>
  );
}
