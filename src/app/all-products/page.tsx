import AllProductsMain from "@/src/components/products/allProducts/AllProductsMain";

interface PageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  return <AllProductsMain searchParams={params} />;
}