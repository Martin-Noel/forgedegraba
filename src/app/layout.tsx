import "./globals.css";
import type { Metadata } from "next";
import Header from "./header";
import ContactModal from "../components/ContactModal";
import ImageModal from "../components/ImageModal";

export const metadata: Metadata = {
  title: "La forge de Graba",
  description: "Couteaux artisanaux forgés à la main",
  openGraph: {
    title: "La forge de Graba",
    description: "Couteaux artisanaux forgés à la main",
    url: "https://www.laforgedegraba.com/",
    siteName: "La forge de Graba",
    images: [
      {
        url: "https://www.laforgedegraba.com/background/bg-main.jpg",
        width: 1200,
        height: 630,
        alt: "La forge de Graba - artisan coutelier",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La forge de Graba",
    description: "Couteaux artisanaux forgés à la main",
    images: ["https://www.laforgedegraba.com/background/bg-main.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`bg-neutral-950 text-white`}>
        <Header />
        <ContactModal />
        <ImageModal />
        <main>{children}</main>
        <footer className="mt-20 py-10 text-center text-sm text-steel">
          © {new Date().getFullYear()} La forge de{" "}
          <span className="text-copper">Graba</span> — Tous droits réservés.
          <div className="mt-2">
            <a
              href="/mentions-legales"
              className="underline text-steel hover:text-white"
            >
              Mentions légales
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
