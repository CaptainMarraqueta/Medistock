'use client'

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/src/constants/routes";

interface IHeaderBarProps {
  heading: string;
  breadcrump: string;
}

export default function HeaderBar({ heading, breadcrump }: IHeaderBarProps) {
  const router = useRouter();

  return (
    <div className="relative rounded-2xl overflow-hidden bg-muted h-36 p-4 md:p-8 flex items-center">

      <div className="absolute inset-0">
        <Image
          src="/backgrounds/header-bg.png"
          alt="decor"
          className="w-full h-full object-cover"
          fill
        />
      </div>

      <div className="relative z-[1] cursor-default">
        <h2 className="text-xl font-semibold">{heading}</h2>
        <p className="text-sm flex gap-2 items-center">
          <span className="text-muted-foreground cursor-pointer" onClick={() => router.push(ROUTE.HOME)}>Home</span>
          <span><ChevronRight size={13} className="mt-0.5" /></span>
          <span>{breadcrump}</span>
        </p>
      </div>
    </div>
  );
}