import "./globals.css";
import type { Metadata } from "next";
import Header from "./header";
import ContactModal from "../components/ContactModal";
import ImageModal from "../components/ImageModal";

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
