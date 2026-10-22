"use client";

import { useEffect, useState } from "react";
import type { DashboardStats } from "@/lib/dashboard";

/** Shared client fetch for `/api/dashboard` metrics. Starts empty so pages do not paint the fixed fallback counts. */
export function useDashboardStats() {
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/dashboard")
      .then(async (response) => {
        if (!response.ok) throw new Error("dashboard failed");
        return (await response.json()) as { success?: boolean; data?: DashboardStats };
      })
      .then((body) => {
        if (cancelled || !body.success || !body.data) return;
        setDashboard(body.data);
      })
      .catch(() => {
        /* keep fallback */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return dashboard;
}
