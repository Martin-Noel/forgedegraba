import type { Metadata } from "next";
import creations from "../../data/creations.json";
import OpenContactButton from "../../../src/components/OpenContactButton";
import ImagePreview from "../../../src/components/ImagePreview";

export const metadata: Metadata = {
  title: "Créations — Couteaux artisanaux forgés | La forge de Graba",
  description:
    "Découvrez nos couteaux de cuisine artisanaux forgés à la main : lames en acier carbone, manches en bois stabilisé. Pièces uniques pour professionnels et passionnés.",
  alternates: {
    canonical: "/creations",
  },
};

type Creation = {
  id: string;
  title: string;
  blade_length_cm: number;
  handle_length_cm: number;
  width_cm: number;
  handle_material: string;
  description: string;
  image: string;
  price?: number;
};

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default function CreationsPage() {
  // JSON-LD for Product offers
  const productsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: (creations as Creation[]).map((c, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: c.title,
        description: c.description,
        image: `https://www.laforgedegraba.com${c.image}`,
        brand: {
          "@type": "Brand",
          name: "La forge de Graba",
        },
        offers: c.price
          ? {
              "@type": "Offer",
              price: c.price,
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "La forge de Graba",
              },
            }
          : undefined,
      },
    })),
  };

  return (
    <main
      className="max-w-6xl mx-auto px-6 py-24"
      style={{ scrollMarginTop: 80 }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />
      <header className="text-center mb-12">
        <h1 className="text-5xl font-cinzel text-copper">Les créations</h1>
        <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
          Une sélection de couteaux forgés à la main — pièces uniques et
          finitions soignées.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 items-stretch">
        {(creations as Creation[]).map((c) => (
          <article key={c.id} className="creation-card">
            <div className="card-media">
              <ImagePreview src={c.image} alt={c.title} rotate90 />
            </div>

            <div className="card-body">
              {/* Title + meta centered */}
              <div className="text-center">
                <h3 className="creation-title font-cinzel">{c.title}</h3>
                <p className="creation-meta">
                  Lame {c.blade_length_cm}cm · Manche {c.handle_length_cm}cm ·{" "}
                  {c.width_cm}cm
                </p>
              </div>

              {/* Body copy grows to fill, like stages */}
              <div className="flex-1 mt-2">
                <p className="text-gray-300 text-sm text-center">
                  {c.handle_material}
                </p>
                <p className="mt-2 text-gray-300 text-sm text-center">
                  {c.description}
                </p>
              </div>

              {/* Footer: price then CTA centered */}
              <div className="mt-5 text-center">
                <div className="min-h-[1.75rem] text-copper font-semibold text-lg mb-3">
                  {typeof c.price === "number"
                    ? priceFormatter.format(c.price)
                    : "\u00A0"}
                </div>
                <div className="flex justify-center">
                  <OpenContactButton
                    className="btn-primary"
                    subject={`Info ${c.title}`}
                  >
                    Demande info
                  </OpenContactButton>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
