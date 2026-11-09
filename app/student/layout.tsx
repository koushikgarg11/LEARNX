import React from "react";
import { AppNavbar } from "@/components/navigation/app-navbar";
import { AppSidebar } from "@/components/navigation/app-sidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppNavbar />
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <AppSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
