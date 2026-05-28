const DOMAIN = (process.env.SHOPIFY_DOMAIN ?? "")
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN ?? "";

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  onlineStoreUrl: string | null;
  availableForSale: boolean;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  variants: {
    edges: { node: { id: string; availableForSale: boolean } }[];
  };
};

const PRODUCTS_QUERY = `
  query Products($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          description
          onlineStoreUrl
          availableForSale
          featuredImage { url altText }
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          variants(first: 1) {
            edges { node { id availableForSale } }
          }
        }
      }
    }
  }
`;

export async function getProducts(options?: {
  first?: number;
  tag?: string;
  revalidate?: number;
}): Promise<ShopifyProduct[]> {
  const { first = 20, tag, revalidate = 3600 } = options ?? {};

  if (!DOMAIN || !TOKEN || TOKEN === "xxxxxxx") return [];

  const res = await fetch(`https://${DOMAIN}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({
      query: PRODUCTS_QUERY,
      variables: { first, query: tag ? `tag:${tag}` : undefined },
    }),
    next: { revalidate },
  });

  if (!res.ok) {
    console.error("Shopify fetch failed", res.status, await res.text());
    return [];
  }

  const json = await res.json();

  if (json.errors) {
    console.error("Shopify GraphQL errors", json.errors);
    return [];
  }

  return json.data.products.edges.map(
    (e: { node: ShopifyProduct }) => e.node
  );
}

export function productCheckoutUrl(product: ShopifyProduct): string {
  if (product.onlineStoreUrl) return product.onlineStoreUrl;
  return `https://${DOMAIN}/products/${product.handle}`;
}

export function formatPrice(product: ShopifyProduct): string {
  const { amount, currencyCode } = product.priceRange.minVariantPrice;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}
