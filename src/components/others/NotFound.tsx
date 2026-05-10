"use client";

import Lottie from "lottie-react";
import fileScanning from "@/src/assets/lotties/fileScanning.json";
import Link from "next/link";
import { ROUTE } from "@/src/constants/routes";
import { Button } from "../ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">

      <div className="w-full max-w-sm">
        <Lottie animationData={fileScanning} loop={true} />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mt-6">Oops!</h1>
      <p className="text-muted-foreground mt-2 text-base md:text-lg">
        We couldn&apos;t find the page you were looking for
      </p>

      <Link href={ROUTE.HOME}>
        <Button className="mt-6">
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
};