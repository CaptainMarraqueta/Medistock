'use client'

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import Lottie from "lottie-react";
import PasswordAuthentication from "@/src/assets/lotties/PasswordAuthentication.json";
import { useRouter } from "next/navigation";

export default function LoginDialogContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // 🔥 FIX: evitar crash si backend no devuelve JSON
      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Respuesta inválida del servidor:", text);
        alert("Error del servidor");
        return;
      }

      if (!res.ok) {
        alert(data.error || "Error al iniciar sesión");
        return;
      }

      console.log("Login OK:", data.user);

      // redirección por rol
      if (data.user?.rol === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <div className="w-full max-w-[8rem] mx-auto">
          <Lottie animationData={PasswordAuthentication} loop />
        </div>

        <DialogTitle className="text-center">
          Welcome to MediStock
        </DialogTitle>

        <DialogDescription className="text-center">
          Sign in with your email and password
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-3 mt-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </DialogContent>
  );
}