import { ProductStorefront } from "@/components/Storefront";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  return <ProductStorefront slug={slug} />;
}
