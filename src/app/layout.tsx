import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/navigation/footer";
import Header from "@/components/Header";
import { Suspense } from "react";
import { ScrollProvider } from "@/context/ScrollContext";
import SiteChrome from "@/components/wrappers/SiteChrome";
import QueryProvider from "@/providers/QueryProvider";
import { AuthProvider } from "@/context/AuthContext";

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
        <QueryProvider>
          <AuthProvider>
            <ScrollProvider>
              <SiteChrome>
                <Header />
              </SiteChrome>

              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>

              <SiteChrome>
                <Footer />
              </SiteChrome>
            </ScrollProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
