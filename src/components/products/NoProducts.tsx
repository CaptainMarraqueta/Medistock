"use client";

import Lottie from "lottie-react";
import fileScanning from "@/src/assets/lotties/fileScanning.json";
import Link from "next/link";
import { Button } from "../ui/button";

interface NoProductsProps {
  title: string;
  message: string;
  showButton: boolean;
  buttonLabel?: string;
  redirectTo?: string;
}

export default function NoProducts({ title, message, showButton, buttonLabel, redirectTo }: NoProductsProps) {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <Lottie animationData={fileScanning} loop={true} />
        </div>

        <h1 className="text-2xl font-bold mt-6">{title}</h1>
        <p className="text-muted-foreground mt-2 text-base text-center">
          {message}
        </p>

        {showButton && buttonLabel && redirectTo && (
          <Link href={redirectTo}>
            <Button className="mt-6">
              {buttonLabel}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};