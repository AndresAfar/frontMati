"use client";

import { History, User, Landmark } from "lucide-react";
import HistorialLista from "@/components/historial-lista";

export default function SeccionD() {
  return (
    <section className="flex flex-col bg-surface rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
        <History className="h-5 w-5 text-primary" />
        <div>
          <h2 className="font-bold text-ink text-sm">
            Historial Unificado de la Atención
          </h2>
          <p className="text-xs text-muted">
            Registro cronológico de la sesión activa
          </p>
        </div>
      </header>

      <HistorialLista maxHeight="420px" />

      <footer className="px-4 py-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-muted">
        <span className="flex items-center gap-1">
          <User className="h-3 w-3" /> Cliente
        </span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Landmark className="h-3 w-3" /> Cajero
        </span>
        <span className="ml-auto">Se borra al reiniciar sesión</span>
      </footer>
    </section>
  );
}
