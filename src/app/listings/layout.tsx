import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Listings | Fame.",
  description: "Explore premium lifestyle venues hand-picked by our curation team. Find the best restaurants, gyms, spas, and nightlife spots.",
  openGraph: {
    title: "Browse Listings | Fame.",
    description: "Explore premium lifestyle venues hand-picked by our curation team.",
  },
};

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
