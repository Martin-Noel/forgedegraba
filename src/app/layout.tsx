import "./globals.css";
import type { Metadata } from "next";
import Header from "./header";
import ContactModal from "../components/ContactModal";
import ImageModal from "../components/ImageModal";

import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "La forge de Graba | Couteaux artisanaux en Dordogne",
  description:
    "Couteaux de cuisine forgés à la main en Dordogne. Aciers carbone, manches en bois stabilisé. Stages de coutellerie à Tursac.",
  metadataBase: new URL("https://www.laforgedegraba.com"),
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "La forge de Graba | Couteaux artisanaux en Dordogne",
    description:
      "Couteaux de cuisine forgés à la main en Dordogne. Aciers carbone, manches en bois stabilisé. Stages de coutellerie à Tursac.",
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
    title: "La forge de Graba | Couteaux artisanaux en Dordogne",
    description:
      "Couteaux de cuisine forgés à la main en Dordogne. Aciers carbone, manches en bois stabilisé. Stages de coutellerie à Tursac.",
    images: ["https://www.laforgedegraba.com/background/bg-main.jpg"],
  },
  keywords: [
    "couteau artisanal",
    "coutellerie artisanale",
    "forge couteau",
    "couteau forgé main",
    "stage coutellerie",
    "Dordogne",
    "Tursac",
    "acier carbone",
    "couteau cuisine",
    "lame damas",
    "artisan coutelier",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD structured data for LocalBusiness
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.laforgedegraba.com/#business",
    name: "La forge de Graba",
    description: "Couteaux artisanaux forgés à la main",
    url: "https://www.laforgedegraba.com",
    telephone: "+33627899593",
    email: "grabaistos@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hameau des Genêts",
      addressLocality: "Tursac",
      postalCode: "24620",
      addressRegion: "Dordogne",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "45.0167",
      longitude: "1.0333",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    image: "https://www.laforgedegraba.com/background/bg-main.jpg",
    priceRange: "€€",
    founder: {
      "@type": "Person",
      name: "Valentin ADAM",
    },
    sameAs: [],
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`bg-neutral-950 text-white`}>
        <Header />
        <ContactModal />
        <ImageModal />
        <main>{children}</main>
        <Analytics />
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
