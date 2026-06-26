"use client";

import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { MobileFilterSection } from "./MobileFilterSection";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const AllProductHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") ?? "";
  const [query, setQuery] = useState(initialSearch);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }

      router.push(`?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="flex items-center gap-2 h-10 mb-5">
      <div className="relative flex-1 w-full md:max-w-xl h-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <Input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 rounded-3xl h-full text-sm"
        />
      </div>

      <div className="block lg:hidden">
        <MobileFilterSection />
      </div>
    </div>
  );
};