import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fame. | Premium Lifestyle Discovery",
  description: "Discover the world's most exclusive restaurants, elite wellness centers, and secret nightspots. Hand-verified by Fame.",
  keywords: ["lifestyle", "premium", "restaurants", "fitness", "wellness", "nightlife", "spa", "beauty"],
  authors: [{ name: "Fame" }],
  creator: "Fame",
  publisher: "Fame",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fame.app",
    title: "Fame. | Premium Lifestyle Discovery",
    description: "Discover the world's most exclusive restaurants, elite wellness centers, and secret nightspots.",
    siteName: "Fame",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fame. | Premium Lifestyle Discovery",
    description: "Discover the world's most exclusive restaurants, elite wellness centers, and secret nightspots.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
