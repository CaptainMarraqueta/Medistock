import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { MobileFilterSection } from "./MobileFilterSection";

export const AllProductHeader = () => {
  return (
    <div className="flex items-center justify-end gap-2 h-10 mb-5">
      <div className="relative flex-1 w-full md:max-w-xl h-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search products..."
          className="pl-9 rounded-3xl h-full text-sm"
        />
      </div>
      <div className="block lg:hidden">
        <MobileFilterSection />
      </div>
    </div>
  );
};