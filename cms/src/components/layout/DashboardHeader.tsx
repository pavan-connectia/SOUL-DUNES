"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b px-4 md:hidden">

      <SidebarTrigger />
      <span className="font-semibold">Dashboard</span>
    </header>
  );
}
