import type { Metadata } from "next";
import { getProducts, productCheckoutUrl, formatPrice } from "@/lib/shopify";
import ImagePreview from "@/components/ImagePreview";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Créations — Couteaux artisanaux forgés | La forge de Graba",
  description:
    "Découvrez nos couteaux de cuisine artisanaux forgés à la main : lames en acier carbone, manches en bois stabilisé. Pièces uniques pour professionnels et passionnés.",
  alternates: {
    canonical: "/creations",
  },
};

export default async function CreationsPage() {
  const products = await getProducts({ first: 50 });

  const productsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: p.title,
        description: p.description,
        image: p.featuredImage?.url,
        brand: { "@type": "Brand", name: "La forge de Graba" },
        offers: {
          "@type": "Offer",
          price: parseFloat(p.priceRange.minVariantPrice.amount),
          priceCurrency: p.priceRange.minVariantPrice.currencyCode,
          availability: p.availableForSale
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: { "@type": "Organization", name: "La forge de Graba" },
        },
      },
    })),
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-24" style={{ scrollMarginTop: 80 }}>
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

      {products.length === 0 ? (
        <p className="text-center text-gray-400">
          Les créations arrivent bientôt.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 items-stretch">
          {products.map((p) => (
            <article key={p.id} className="creation-card">
              {p.featuredImage && (
                <div className="card-media">
                  <ImagePreview
                    src={p.featuredImage.url}
                    alt={p.featuredImage.altText ?? p.title}
                    rotate90
                  />
                </div>
              )}

              <div className="card-body">
                <div className="text-center">
                  <h2 className="creation-title font-cinzel">{p.title}</h2>
                </div>

                <div className="flex-1 mt-2">
                  <p className="mt-2 text-gray-300 text-sm text-center line-clamp-4">
                    {p.description}
                  </p>
                </div>

                <div className="mt-5 text-center">
                  <div className="text-copper font-semibold text-lg mb-3">
                    {formatPrice(p)}
                  </div>
                  <div className="flex justify-center">
                    <a
                      href={productCheckoutUrl(p)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-primary${!p.availableForSale ? " opacity-50 pointer-events-none" : ""}`}
                    >
                      {p.availableForSale ? "Acheter" : "Indisponible"}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
