import { Metadata } from "next";
import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import Categories from "../components/Categories";
import Features from "../components/Features";
import PremiumCuration from "../components/PremiumCuration";
import Testimonials from "../components/Testimonials";
import ListingGrid from "../components/ListingGrid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fame - Улаанбаатар дахь шилдэг спорт заал, ресторан, спа",
  description: "Улаанбаатар хотын шилдэг спорт заал, ресторан, спа, эрүүл мэндийн байгууллага, цэнгээний газруудыг олж нээгээрэй. Баталгаат бизнесүүд болон бодит үнэлгээ.",
  keywords: [
    "шилдэг спорт заал Улаанбаатар",
    "шилдэг ресторан Монгол",
    "спа Улаанбаатар",
    "фитнесс төв Монгол",
    "эрүүл мэнд Улаанбаатар",
    "цэнгээний газар Монгол",
    "гоо сайхны салон Улаанбаатар",
    "ойролцоох фитнесс Монгол",
    "ресторан Улаанбаатар",
    "бизнес лавлах Монгол",
  ],
  openGraph: {
    title: "Fame - Улаанбаатар дахь шилдэг спорт заал, ресторан, спа",
    description: "Монгол дахь баталгаат бизнесүүд болон бодит хэрэглэгчдийн үнэлгээг олж нээгээрэй",
    url: "https://fame.mn",
    type: "website",
  },
  alternates: {
    canonical: "https://fame.mn",
  },
};

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
