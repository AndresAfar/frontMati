"use client";

import { Video, Languages, Hand, Radio } from "lucide-react";
import { useSession } from "@/lib/session-context";

export default function SeccionC() {
  const { transcripcionLSC } = useSession();

  return (
    <section className="flex flex-col bg-surface rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
        <Video className="h-5 w-5 text-primary" />
        <div>
          <h2 className="font-bold text-ink text-sm">
            Feed de Cámara LSC
          </h2>
          <p className="text-xs text-muted">
            Visor en vivo del cliente · traducción en tiempo real
          </p>
        </div>
      </header>

      <div className="relative aspect-video bg-dark">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-700 to-dark">
          <div className="text-center text-slate-400">
            <Hand className="h-14 w-14 mx-auto mb-2 text-slate-500" />
            <p className="text-xs">Señando frente a la cámara</p>
          </div>
        </div>

        <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-success-500/20 px-3 py-1 backdrop-blur">
          <Radio className="h-3.5 w-3.5 text-success-400 animate-pulse" />
          <span className="text-[11px] font-semibold text-success-300">
            Atención LSC En Línea
          </span>
        </div>

        <div className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 text-[11px] text-slate-300">
          CLIENTE · CAM 01
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted">
          <Languages className="h-3.5 w-3.5 text-success" />
          Transcripción LSC en vivo
        </div>
        <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2.5 min-h-[48px]">
          <p className="text-sm text-ink leading-relaxed">
            {transcripcionLSC || "Esperando seña del cliente..."}
          </p>
        </div>
      </div>
    </section>
  );
}
