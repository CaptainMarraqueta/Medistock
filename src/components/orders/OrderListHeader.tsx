'use client'

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { OrderFilter } from "./OrderFilter";

export const OrderListHeader = () => {
  return (
    <div className="flex items-center justify-end gap-2 h-10">
      <div className="relative flex-1 max-w-md h-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search orders..."
          className="pl-9 rounded-3xl h-full text-sm"
        />
      </div>

      <OrderFilter />
    </div>
  );
};