import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/navigation/footer";
import Header from "@/components/Header";
import { Suspense } from "react";
import { ScrollProvider } from "@/context/ScrollContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DrDermx",
  description: "A Skin Health Revolution in India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased text-secondary`}>
        <ScrollProvider>
          <Header />

          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}
