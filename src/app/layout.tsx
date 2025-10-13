import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "La forge de graba",
  description: "Couteaux artisanaux forgés à la main",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-neutral-950 text-white`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
