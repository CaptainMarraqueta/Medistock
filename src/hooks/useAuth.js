"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}