import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/navigation/footer";
import Header from "@/components/Header";
import { Suspense } from "react";
import { ScrollProvider } from "@/context/ScrollContext";
import SiteChrome from "@/components/wrappers/SiteChrome";
import QueryProvider from "@/providers/QueryProvider";
import { AuthProvider } from "@/context/AuthContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
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
    <html lang='en' className={jakarta.variable}>
      <body className='font-sans antialiased text-ink'>
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
