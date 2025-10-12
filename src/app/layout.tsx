import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forge Artisanale — Le feu façonne le métal",
  description: "Créations forgées à la main entre tradition et modernité.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md">
          <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
            {/* Poinçon comme logo */}
            <Link href="/" className="relative w-12 h-12 md:w-20 md:h-20">
              <Image
                src="/stamps/stamp_white.png"
                alt="stamp"
                fill
                className="object-contain"
              />
            </Link>
            <h1 className="text-2xl font-cinzel tracking-wide">
              La forge de <span className="text-copper"> graba </span>
            </h1>
            <ul className="hidden md:flex space-x-8 text-sm uppercase tracking-wider">
              <li>
                <Link href="#savoir-faire" className="hover:text-copper">
                  Savoir-faire
                </Link>
              </li>
              <li>
                <Link href="#creations" className="hover:text-copper">
                  Créations
                </Link>
              </li>
              <li>
                <Link href="#atelier" className="hover:text-copper">
                  Atelier
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-copper">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="mt-20 py-10 text-center text-sm text-steel">
          © {new Date().getFullYear()} Forge Artisanale — Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}
