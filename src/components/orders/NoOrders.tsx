"use client";

import Lottie from "lottie-react";
import fileScanning from "@/assets/lotties/fileScanning.json";
import Link from "next/link";
import { Button } from "../ui/button";

interface NoOrdersProps {
  title: string;
  message: string;
  buttonLabel: string;
  redirectTo: string;
}

export default function NoOrders({ title, message, buttonLabel, redirectTo }: NoOrdersProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70dvh]">
      <div className="w-full max-w-sm">
        <Lottie animationData={fileScanning} loop={true} />
      </div>

      <h1 className="text-2xl font-bold mt-6">{title}</h1>
      <p className="text-muted-foreground mt-2 text-base text-center">
        {message}
      </p>

      <Link href={redirectTo}>
        <Button className="mt-6">
          {buttonLabel}
        </Button>
      </Link>
    </div>
  );
};