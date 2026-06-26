import ProductCard from "../ProductCard";
import DesktopFilterSection from "./DesktopFilterSection";
import { AllProductHeader } from "./AllProductHeader";
import NoProducts from "../NoProducts";
import { prisma } from "@/src/lib/prisma";
import { mapProduct } from "@/src/lib/mappers/product.mapper";
import { IProduct } from "@/src/types/general";

interface Props {
  searchParams?: {
    search?: string;
    sort?: string;
    category?: string;
  };
}

async function getProducts(
  search: string,
  sort: string,
  categories: string[]
): Promise<IProduct[]> {
  const products = await prisma.product.findMany({
    where: {
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),

      ...(categories.length > 0 && !categories.includes("all")
        ? {
            category: {
              in: categories,
            },
          }
        : {}),
    },

    orderBy:
      sort === "oldest"
        ? {
            createdAt: "asc",
          }
        : sort === "name"
        ? {
            name: "asc",
          }
        : sort === "price"
        ? {
            originalPrice: "asc",
          }
        : sort === "rating"
        ? {
            rating: "desc",
          }
        : {
            createdAt: "desc",
          },

    include: {
      images: true,
    },
  });

  return products.map(mapProduct);
}

export default async function AllProductsMain({
  searchParams,
}: Props) {
  const search = searchParams?.search ?? "";
  const sort = searchParams?.sort ?? "newest";

  const categories =
    searchParams?.category?.split(",").filter(Boolean) ?? [];

  const products = await getProducts(search, sort, categories);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="flex">
          <DesktopFilterSection />

          <div className="flex-1 p-4 md:p-8 mt-15 lg:mt-10">
            <AllProductHeader />

            {!products.length ? (
              <div className="min-h-[60dvh] flex justify-center items-center">
                <NoProducts
                  showButton={false}
                  title="No Products Found"
                  message="We couldn’t find any products. Please check back later or explore other categories."
                />
              </div>
            ) : (
              <div className="grid gap-2 md:gap-5 grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}