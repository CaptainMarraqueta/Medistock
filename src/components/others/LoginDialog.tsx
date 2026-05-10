'use client'

import React from "react";
import { Button } from "../ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import PasswordAuthentication from "@/src/assets/lotties/PasswordAuthentication.json";
import { FaApple } from "react-icons/fa";


export default function LoginDialogContent() {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <div className="w-full max-w-[8rem] mx-auto">
          <Lottie animationData={PasswordAuthentication} loop={true} />
        </div>
        <DialogTitle className="text-center">Welcome to E-com</DialogTitle>
        <DialogDescription className="text-center">
          Login with your Apple or Google account
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2">
        <Button variant="outline" className="w-full">
          <FcGoogle />
          Login with Google
        </Button>
        <Button variant="outline" className="w-full">
          <FaApple />
          Login with Apple
        </Button>
      </div>
    </DialogContent>
  );
};










