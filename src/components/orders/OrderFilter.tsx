'use client'

import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Checkbox } from "../ui/checkbox";

interface OrderFilterState {
  status: string[];
  sortBy: "name" | "date" | "total";
}

const SORT_OPTIONS: { value: OrderFilterState["sortBy"]; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "date", label: "Date" },
  { value: "total", label: "Total" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Orders" },
  { value: "Delivered", label: "Delivered" },
  { value: "Shipped", label: "Shipped" },
  { value: "Processing", label: "Processing" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Pending", label: "Pending" },
];

export const OrderFilter = () => {
  const [filters, setFilters] = useState<OrderFilterState>({
    status: ["all"],
    sortBy: "name",
  });

  const handleFilterChange = (newFilters: Partial<OrderFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const toggleStatus = (status: string) => {
    if (status === "all") {
      handleFilterChange({ status: ["all"] });
    } else {
      let newStatus = filters.status.includes(status)
        ? filters.status.filter((s) => s !== status)
        : [...filters.status.filter((s) => s !== "all"), status];

      if (newStatus.length === 0) {
        newStatus = ["all"];
      }

      handleFilterChange({ status: newStatus });
    }
  };

  const clearAllFilters = () => {
    setFilters({
      status: ["all"],
      sortBy: "name",
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 h-9 rounded-3xl w-fit md:min-w-32">
          <Filter className="h-4 w-4" />
          <span className="hidden md:inline">Filter</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        backdrop={true}
        className="w-80 p-0 mx-2 max-h-[30rem] overflow-x-hidden overflow-y-auto custom-scrollbar"
        align="center"
      >
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Filter & Sort</h4>
            <div className="flex items-center gap-1 h-7">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="h-7 text-xs px-2 text-destructive border-red-500 hover:bg-red-500/10"
              >
                Clear all
              </Button>
              <PopoverClose asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="h-7 text-xs"
                >
                  Apply filter
                </Button>
              </PopoverClose>
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-1">
            <span className="text-sm font-medium">Sort by</span>
            <div className="space-y-1.5 pt-2">
              {SORT_OPTIONS.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.sortBy === option.value}
                    onCheckedChange={() => handleFilterChange({ sortBy: option.value })}
                  />
                  <span className="text-xs">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <span className="text-sm font-medium">Status</span>
            <div className="space-y-1.5 pt-2">
              {STATUS_OPTIONS.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.status.includes(option.value)}
                    onCheckedChange={() => toggleStatus(option.value)}
                  />
                  <span className="text-xs">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

        </div>
      </PopoverContent>
    </Popover>
  );
};