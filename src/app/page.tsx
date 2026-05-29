import { getProducts } from "@/lib/shopify";
import HomeClient from "./HomeClient";

export const revalidate = 3600;

export default async function HomePage() {
  const featuredProducts = (await getProducts({ first: 3, tag: "featured" })).filter((p) => p.availableForSale);
  return <HomeClient featuredProducts={featuredProducts} />;
}
