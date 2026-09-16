"use client";

import Link from "next/link";
import { ArrowLeft, Landmark } from "lucide-react";
import SeccionA from "@/components/cajero/seccion-a";
import SeccionB from "@/components/cajero/seccion-b";
import SeccionC from "@/components/cajero/seccion-c";
import SeccionD from "@/components/cajero/seccion-d";

export default function CajeroPage() {
  return (
    <main className="min-h-screen bg-background text-ink flex flex-col">
      <header className="bg-primary text-white px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-lg p-2 text-white/90 hover:bg-white/10 transition"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Landmark className="h-6 w-6 text-white" />
            <span className="font-bold">Banco Contigo</span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-success-500/20 px-3 py-1 text-xs font-semibold text-success-300">
          <span className="h-2 w-2 rounded-full bg-success-400 animate-pulse" />
          Estación Cajero
        </div>
      </header>

      <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div className="flex flex-col gap-4">
          <SeccionA />
          <SeccionD />
        </div>
        <SeccionC />
        <SeccionB />
      </div>
    </main>
  );
}
